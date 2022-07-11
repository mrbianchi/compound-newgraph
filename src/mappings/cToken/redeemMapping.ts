import { log } from "@graphprotocol/graph-ts";
import { Redeem } from "../../types/templates/CToken/CToken";

// Currently not in use. Everything can be done in handleTransfer, since a Redeem event
// is always done alongside a Transfer event, with the same data
export function handleRedeem(event: Redeem): void {
  log.info("Redeem event handled", []);
  log.info("param redeemer: {}", [event.params.redeemer.toHexString()]);
  log.info("param redeemAmount: {}", [event.params.redeemAmount.toString()]);
  log.info("param redeemTokens: {}", [event.params.redeemTokens.toString()]);
}
