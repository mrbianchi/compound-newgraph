import { BigInt } from "@graphprotocol/graph-ts";
import { LiquidateBorrow } from "../../types/templates/CToken/CToken";
import { getAccount } from "../../utils";

/*
 * Liquidate an account who has fell below the collateral factor.
 *
 * event.params.borrower - the borrower who is getting liquidated of their cTokens
 * event.params.cTokenCollateral - the market ADDRESS of the ctoken being liquidated
 * event.params.liquidator - the liquidator
 * event.params.repayAmount - the amount of underlying to be repaid
 * event.params.seizeTokens - cTokens seized (transfer event should handle this)
 *
 * Notes
 *    No need to updateMarket(), handleAccrueInterest() ALWAYS runs before this.
 *    When calling this function, event RepayBorrow, and event Transfer will be called every
 *    time. This means we can ignore repayAmount. Seize tokens only changes state
 *    of the cTokens, which is covered by transfer. Therefore we only
 *    add liquidation counts in this handler.
 */
export function handleLiquidateBorrow(event: LiquidateBorrow): void {
  const liquidatorId = event.params.liquidator.toHexString();
  const borrowerId = event.params.borrower.toHexString();
  const liquidatorAccount = getAccount(liquidatorId);
  const borrowerAccount = getAccount(borrowerId);

  liquidatorAccount.countLiquidator = liquidatorAccount.countLiquidator.plus(BigInt.fromU64(1));
  borrowerAccount.countLiquidated = borrowerAccount.countLiquidated.plus(BigInt.fromU64(1));

  liquidatorAccount.save();
  borrowerAccount.save();
}
