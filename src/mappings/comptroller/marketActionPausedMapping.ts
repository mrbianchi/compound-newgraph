import { log } from "@graphprotocol/graph-ts";
import { ActionPaused1 } from "../../types/Comptroller/Comptroller";

export function handleMarketActionPaused(event: ActionPaused1): void {
  log.info("ActionPaused event handled", []);
  log.info("param cToken: {}", [event.params.cToken.toHexString()]);
  log.info("param action: {}", [event.params.action.toString()]);
  log.info("param pauseState: {}", [event.params.pauseState.toString()]);
}
