import { log } from "@graphprotocol/graph-ts";
import { Redeem } from "../../types/templates/CToken/CToken";

export function handleRedeem(event: Redeem): void {
  log.info("Redeem event handled", []);
  log.info("param redeemer: {}", [event.params.redeemer.toHexString()]);
  log.info("param redeemAmount: {}", [event.params.redeemAmount.toString()]);
  log.info("param redeemTokens: {}", [event.params.redeemTokens.toString()]);
}
