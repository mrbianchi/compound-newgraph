import { log } from "@graphprotocol/graph-ts";
import { OneBI, ZeroBD } from "../../constants";
import { BorrowUnderlyingEvent } from "../../types/schema";
import { Borrow } from "../../types/templates/CToken/CToken";
import {
  exponentToBigDecimal,
  getAccount,
  getAccountMarket,
  getMarket,
  isNonFunctionalMarket,
  updateAccountAggregates,
  updateAccountMarket,
} from "../../utils";

/* Borrow assets from the protocol. All values either native token or ERC20
 *
 * event.params.totalBorrows = of the whole market (not used right now)
 * event.params.accountBorrows = total of the account
 * event.params.borrowAmount = that was added in this event
 * event.params.borrower = the account
 * Notes
 *    No need to updateMarket(), handleAccrueInterest() ALWAYS runs before this
 */
export function handleBorrow(event: Borrow): void {
  const marketId = event.address.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const borrowerAccountId = event.params.borrower.toHexString();
  const accountBorrowsBD = event.params.accountBorrows.toBigDecimal();
  const borrowAmountBD = event.params.borrowAmount.toBigDecimal();
  const market = getMarket(marketId, event);
  const borrowerAccount = getAccount(borrowerAccountId, event);
  const borrowerAccountMarket = getAccountMarket(borrowerAccountId, marketId, event);
  const previousStoredBorrowBalance = borrowerAccountMarket.storedBorrowBalance;

  updateAccountMarket(borrowerAccountMarket, market, event);

  borrowerAccount.hasBorrowed = true;

  borrowerAccountMarket.storedBorrowBalance = accountBorrowsBD.div(exponentToBigDecimal(market.underlyingDecimals));
  borrowerAccountMarket.accountBorrowIndex = market.borrowIndex;

  // checking edge case for borrwing 0
  if (previousStoredBorrowBalance.equals(ZeroBD) && !accountBorrowsBD.equals(ZeroBD)) {
    market.numberOfBorrowers = market.numberOfBorrowers.plus(OneBI);
  }

  updateAccountAggregates(borrowerAccount);

  market.save();
  borrowerAccount.save();
  borrowerAccountMarket.save();

  const borrowEventId = event.transaction.hash.toHexString().concat("-").concat(event.transactionLogIndex.toString());
  const borrowEvent = new BorrowUnderlyingEvent(borrowEventId);
  borrowEvent.market = marketId;
  borrowEvent.amount = borrowAmountBD.div(exponentToBigDecimal(market.underlyingDecimals));
  borrowEvent.accountBorrows = borrowerAccountMarket.storedBorrowBalance;
  borrowEvent.borrower = event.params.borrower;
  borrowEvent.blockNumber = event.block.number;
  borrowEvent.blockTimestamp = event.block.timestamp;
  borrowEvent.save();
}
