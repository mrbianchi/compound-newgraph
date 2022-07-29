import { log } from "@graphprotocol/graph-ts";
import { CTokenDecimals, CTokenDecimalsBD } from "../../constants";
import { RedeemEvent } from "../../types/schema";
import { Redeem } from "../../types/templates/CToken/CToken";
import { exponentToBigDecimal, getMarket, isNonFunctionalMarket } from "../../utils";

/*  Account supplies cTokens into market and receives underlying asset in exchange
 *
 *  event.redeemAmount is the underlying asset
 *  event.redeemTokens is the cTokens
 *  event.redeemer is the account
 *
 *  Notes
 *    Transfer event will always get emitted with this
 *    No need to updateMarket(), handleAccrueInterest() ALWAYS runs before this
 *    No need to updateCommonCTokenStats, handleTransfer() will
 *    No need to update cTokenBalance, handleTransfer() will
 */
export function handleRedeem(event: Redeem): void {
  const marketId = event.address.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId);

  const redeemEventId = event.transaction.hash.toHexString().concat("-").concat(event.transactionLogIndex.toString());
  const cTokenAmount = event.params.redeemTokens.toBigDecimal().div(CTokenDecimalsBD).truncate(CTokenDecimals);
  const underlyingAmount = event.params.redeemAmount
    .toBigDecimal()
    .div(exponentToBigDecimal(market.underlyingDecimals))
    .truncate(market.underlyingDecimals);

  const redeemEvent = new RedeemEvent(redeemEventId);
  redeemEvent.market = marketId;
  redeemEvent.amount = cTokenAmount;
  redeemEvent.to = event.address;
  redeemEvent.from = event.params.redeemer;
  redeemEvent.blockNumber = event.block.number;
  redeemEvent.blockTime = event.block.timestamp;
  redeemEvent.underlyingAmount = underlyingAmount;
  redeemEvent.save();
}
