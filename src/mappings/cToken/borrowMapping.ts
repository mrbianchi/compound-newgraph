import { BigInt, log } from "@graphprotocol/graph-ts";
import { ZeroBD } from "../../constants";
import { BorrowUnderlyingEvent } from "../../types/schema";
import { Borrow } from "../../types/templates/CToken/CToken";
import {
  addTransactionToAccountMarket,
  exponentToBigDecimal,
  getAccount,
  getAccountMarket,
  getMarket,
  isNonFunctionalMarket,
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
  const borrowerAccountId = event.params.borrower.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId);
  const accountMarket = getAccountMarket(borrowerAccountId, marketId);

  // Update cTokenStats common for all events, and return the stats to update unique
  // values for each event
  addTransactionToAccountMarket(accountMarket, event.block, event.transaction, event.transactionLogIndex);

  const accountBorrows = event.params.accountBorrows
    .toBigDecimal()
    .div(exponentToBigDecimal(market.underlyingDecimals))
    .truncate(market.underlyingDecimals);
  const borrowAmount = event.params.borrowAmount
    .toBigDecimal()
    .div(exponentToBigDecimal(market.underlyingDecimals))
    .truncate(market.underlyingDecimals);
  const previousBorrow = accountMarket.storedBorrowBalance;

  accountMarket.storedBorrowBalance = accountBorrows;
  accountMarket.accountBorrowIndex = market.borrowIndex;
  accountMarket.totalUnderlyingBorrowed = accountMarket.totalUnderlyingBorrowed.plus(borrowAmount);
  accountMarket.save();

  const borrowerAccount = getAccount(borrowerAccountId);
  borrowerAccount.hasBorrowed = true;
  borrowerAccount.save();

  // checking edge case for borrwing 0
  if (previousBorrow.equals(ZeroBD) && !event.params.accountBorrows.toBigDecimal().equals(ZeroBD)) {
    market.numberOfBorrowers = market.numberOfBorrowers.plus(BigInt.fromU64(1));
    market.save();
  }

  const borrowEventId = event.transaction.hash.toHexString().concat("-").concat(event.transactionLogIndex.toString());
  const borrowEvent = new BorrowUnderlyingEvent(borrowEventId);
  borrowEvent.market = marketId;
  borrowEvent.amount = borrowAmount;
  borrowEvent.accountBorrows = accountBorrows;
  borrowEvent.borrower = event.params.borrower;
  borrowEvent.blockNumber = event.block.number;
  borrowEvent.blockTimestamp = event.block.timestamp;
  borrowEvent.save();
}
