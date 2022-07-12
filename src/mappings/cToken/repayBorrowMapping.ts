import { BigInt } from "@graphprotocol/graph-ts";
import { ZeroBD } from "../../constants";
import { RepayBorrow } from "../../types/templates/CToken/CToken";
import { exponentToBigDecimal, getAccount, getMarket, updateCommonCTokenStats } from "../../utils";

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
  const market = getMarket(marketId);

  // Update cTokenStats common for all events, and return the stats to update unique
  // values for each event
  const cTokenStats = updateCommonCTokenStats(market.id, market.symbol, accountId, event.transaction.hash, event.block);

  const repayAmountBD = event.params.repayAmount.toBigDecimal().div(exponentToBigDecimal(market.underlyingDecimals));

  cTokenStats.storedBorrowBalance = event.params.accountBorrows
    .toBigDecimal()
    .div(exponentToBigDecimal(market.underlyingDecimals))
    .truncate(market.underlyingDecimals);

  cTokenStats.accountBorrowIndex = market.borrowIndex;
  cTokenStats.totalUnderlyingRepaid = cTokenStats.totalUnderlyingRepaid.plus(repayAmountBD);
  cTokenStats.save();

  const account = getAccount(accountId);

  if (cTokenStats.storedBorrowBalance.equals(ZeroBD)) {
    market.numberOfBorrowers = market.numberOfBorrowers.minus(BigInt.fromU64(1));
    market.save();
  }

  account.save();
}
