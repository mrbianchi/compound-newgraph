import { BigInt, log } from "@graphprotocol/graph-ts";
import { ZeroBD } from "../../constants";
import { RepayUnderlyingEvent } from "../../types/schema";
import { RepayBorrow } from "../../types/templates/CToken/CToken";
import {
  exponentToBigDecimal,
  getAccount,
  getAccountMarket,
  getMarket,
  isNonFunctionalMarket,
  updateAccountAggregates,
  updateAccountMarket,
} from "../../utils";

/* Repay some amount borrowed. Anyone can repay anyones balance
 *
 * event.params.totalBorrows = of the whole market (not used right now)
 * event.params.accountBorrows = total of the account (not used right now)
 * event.params.repayAmount = that was added in this event
 * event.params.borrower = the borrower
 * event.params.payer = the payer
 *
 * Notes
 *    No need to updateMarket(), handleAccrueInterest() ALWAYS runs before this
 *    Once a account totally repays a borrow, it still has its account interest index set to the
 *    markets value. We keep this, even though you might think it would reset to 0 upon full
 *    repay.
 */
export function handleRepayBorrow(event: RepayBorrow): void {
  const marketId = event.address.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const borrowerId = event.params.borrower.toHexString();
  const market = getMarket(marketId, event);
  const borrowerAccount = getAccount(borrowerId, event);
  const borrowerAccountMarket = getAccountMarket(borrowerId, marketId, event);
  const accountBorrows = event.params.accountBorrows.toBigDecimal().div(exponentToBigDecimal(market.underlyingDecimals));
  const repayAmount = event.params.repayAmount.toBigDecimal().div(exponentToBigDecimal(market.underlyingDecimals));

  updateAccountMarket(borrowerAccountMarket, market, event);

  borrowerAccountMarket.storedBorrowBalance = accountBorrows;
  borrowerAccountMarket.accountBorrowIndex = market.borrowIndex;
  borrowerAccountMarket.totalUnderlyingRepaid = borrowerAccountMarket.totalUnderlyingRepaid.plus(repayAmount);

  if (borrowerAccountMarket.storedBorrowBalance.equals(ZeroBD)) {
    market.numberOfBorrowers = market.numberOfBorrowers.minus(BigInt.fromU64(1));
  }

  updateAccountAggregates(borrowerAccount);

  market.save();
  borrowerAccount.save();
  borrowerAccountMarket.save();

  const repayEventId = event.transaction.hash.toHexString().concat("-").concat(event.transactionLogIndex.toString());
  const repayEvent = new RepayUnderlyingEvent(repayEventId);
  repayEvent.market = marketId;
  repayEvent.amount = repayAmount;
  repayEvent.accountBorrows = accountBorrows;
  repayEvent.borrower = event.params.borrower;
  repayEvent.blockNumber = event.block.number;
  repayEvent.blockTimestamp = event.block.timestamp;
  repayEvent.payer = event.params.payer;
  repayEvent.save();
}
