import { BigInt, log } from "@graphprotocol/graph-ts";
import { CTokenDecimals } from "../../constants";
import { LiquidationEvent } from "../../types/schema";
import { LiquidateBorrow } from "../../types/templates/CToken/CToken";
import { exponentToBigDecimal, getAccount, getMarket, isNonFunctionalMarket } from "../../utils";
import { amountToDecimal } from "../../utils/amountToDecimal";

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
  const marketId = event.address.toHexString();
  const collateralMarketId = event.params.cTokenCollateral.toHexString();
  const liquidatorId = event.params.liquidator.toHexString();
  const borrowerId = event.params.borrower.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  if (isNonFunctionalMarket(collateralMarketId)) {
    log.error("Non functional market {}", [collateralMarketId]);
    return;
  }

  const market = getMarket(marketId, event);
  const collateralMarket = getMarket(collateralMarketId, event);
  const liquidatorAccount = getAccount(liquidatorId, event);
  const borrowerAccount = getAccount(borrowerId, event);

  liquidatorAccount.countLiquidator = liquidatorAccount.countLiquidator.plus(BigInt.fromU64(1));
  borrowerAccount.countLiquidated = borrowerAccount.countLiquidated.plus(BigInt.fromU64(1));

  market.save();
  collateralMarket.save();
  liquidatorAccount.save();
  borrowerAccount.save();

  // For a liquidation, the liquidator pays down the borrow of the underlying
  // asset. They seize one of potentially many types of cToken collateral of
  // the underwater borrower. So we must get that address from the event, and
  // the repay token is the event.address
  const cTokenAmount = amountToDecimal(event.params.seizeTokens, CTokenDecimals);
  const underlyingRepayAmount = event.params.repayAmount.toBigDecimal().div(exponentToBigDecimal(market.underlyingDecimals));

  const liquidationEventId = event.transaction.hash.toHexString().concat("-").concat(event.transactionLogIndex.toString());
  const liquidationEvent = new LiquidationEvent(liquidationEventId);
  liquidationEvent.market = collateralMarketId;
  liquidationEvent.amount = cTokenAmount;
  liquidationEvent.to = event.params.liquidator;
  liquidationEvent.from = event.params.borrower;
  liquidationEvent.blockNumber = event.block.number;
  liquidationEvent.blockTimestamp = event.block.timestamp;
  liquidationEvent.underlyingRepayAmount = underlyingRepayAmount;
  liquidationEvent.save();
}
