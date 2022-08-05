import { log } from "@graphprotocol/graph-ts";
import { CTokenDecimals } from "../../constants";
import { RedeemEvent } from "../../types/schema";
import { Redeem } from "../../types/templates/CToken/CToken";
import {
  exponentToBigDecimal,
  getAccount,
  getAccountMarket,
  getMarket,
  isNonFunctionalMarket,
  updateAccountAggregates,
  updateAccountMarket,
} from "../../utils";
import { amountToDecimal } from "../../utils/amountToDecimal";

/*  Account supplies cTokens into market and receives underlying asset in exchange
 *
 *  event.redeemAmount is the underlying asset
 *  event.redeemTokens is the cTokens
 *  event.redeemer is the account
 *
 *  Notes
 *    Transfer event will always get emitted before this
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

  const redeemerId = event.params.redeemer.toHexString();
  const market = getMarket(marketId, event);
  const redeemerAccount = getAccount(redeemerId, event);
  const redeemerAccountMarket = getAccountMarket(redeemerId, marketId, event);

  updateAccountMarket(redeemerAccountMarket, market, event);

  updateAccountAggregates(redeemerAccount);

  market.save();
  redeemerAccount.save();
  redeemerAccountMarket.save();

  const redeemEventId = event.transaction.hash.toHexString().concat("-").concat(event.transactionLogIndex.toString());
  const cTokenAmount = amountToDecimal(event.params.redeemTokens, CTokenDecimals);
  const underlyingAmount = event.params.redeemAmount.toBigDecimal().div(exponentToBigDecimal(market.underlyingDecimals));
  const redeemEvent = new RedeemEvent(redeemEventId);
  redeemEvent.market = marketId;
  redeemEvent.amount = cTokenAmount;
  redeemEvent.to = event.address;
  redeemEvent.from = event.params.redeemer;
  redeemEvent.blockNumber = event.block.number;
  redeemEvent.blockTimestamp = event.block.timestamp;
  redeemEvent.underlyingAmount = underlyingAmount;
  redeemEvent.save();
}
