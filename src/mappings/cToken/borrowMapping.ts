import { BigInt } from "@graphprotocol/graph-ts";
import { ZeroBD } from "../../constants";
import { Borrow } from "../../types/templates/CToken/CToken";
import { exponentToBigDecimal, getAccount, getMarket, updateCommonCTokenStats } from "../../utils";

/* Borrow assets from the protocol. All values either ETH or ERC20
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
  const market = getMarket(marketId);

  // Update cTokenStats common for all events, and return the stats to update unique
  // values for each event
  const cTokenStats = updateCommonCTokenStats(market.id, market.symbol, borrowerAccountId, event.transaction.hash, event.block);

  const borrowAmountBD = event.params.borrowAmount.toBigDecimal().div(exponentToBigDecimal(market.underlyingDecimals));
  const previousBorrow = cTokenStats.storedBorrowBalance;

  cTokenStats.storedBorrowBalance = event.params.accountBorrows
    .toBigDecimal()
    .div(exponentToBigDecimal(market.underlyingDecimals))
    .truncate(market.underlyingDecimals);

  cTokenStats.accountBorrowIndex = market.borrowIndex;
  cTokenStats.totalUnderlyingBorrowed = cTokenStats.totalUnderlyingBorrowed.plus(borrowAmountBD);
  cTokenStats.save();

  const borrowerAccount = getAccount(borrowerAccountId);
  borrowerAccount.hasBorrowed = true;
  borrowerAccount.save();

  // checking edge case for borrwing 0
  if (previousBorrow.equals(ZeroBD) && !event.params.accountBorrows.toBigDecimal().equals(ZeroBD)) {
    market.numberOfBorrowers = market.numberOfBorrowers.plus(BigInt.fromU64(1));
    market.save();
  }
}
