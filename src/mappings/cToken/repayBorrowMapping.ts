import { BigInt, log } from "@graphprotocol/graph-ts";
import { ZeroBD } from "../../constants";
import { RepayUnderlyingEvent } from "../../types/schema";
import { RepayBorrow } from "../../types/templates/CToken/CToken";
import {
  addTransactionToAccountMarket,
  exponentToBigDecimal,
  getAccount,
  getAccountMarket,
  getMarket,
  isNonFunctionalMarket,
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
  const accountId = event.params.borrower.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId, event);
  const accountMarket = getAccountMarket(accountId, marketId, event);

  // Update cTokenStats common for all events, and return the stats to update unique
  // values for each event
  addTransactionToAccountMarket(accountMarket, event);

  const accountBorrows = event.params.accountBorrows
    .toBigDecimal()
    .div(exponentToBigDecimal(market.underlyingDecimals))
    .truncate(market.underlyingDecimals);
  const repayAmount = event.params.repayAmount
    .toBigDecimal()
    .div(exponentToBigDecimal(market.underlyingDecimals))
    .truncate(market.underlyingDecimals);

  accountMarket.storedBorrowBalance = accountBorrows;
  accountMarket.accountBorrowIndex = market.borrowIndex;
  accountMarket.totalUnderlyingRepaid = accountMarket.totalUnderlyingRepaid.plus(repayAmount);
  accountMarket.save();

  const account = getAccount(accountId, event);

  if (accountMarket.storedBorrowBalance.equals(ZeroBD)) {
    market.numberOfBorrowers = market.numberOfBorrowers.minus(BigInt.fromU64(1));
    market.save();
  }

  account.save();

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
