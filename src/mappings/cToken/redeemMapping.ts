import { log } from "@graphprotocol/graph-ts";
import { Redeem } from "../../types/templates/CToken/CToken";

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
// Currently not in use. Everything can be done in handleTransfer, since a Redeem event
// is always done alongside a Transfer event, with the same data
export function handleRedeem(event: Redeem): void {
  log.info("Redeem event handled", []);
  log.info("param redeemer: {}", [event.params.redeemer.toHexString()]);
  log.info("param redeemAmount: {}", [event.params.redeemAmount.toString()]);
  log.info("param redeemTokens: {}", [event.params.redeemTokens.toString()]);
}
