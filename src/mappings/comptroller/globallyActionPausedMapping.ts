import { log } from "@graphprotocol/graph-ts";
import { ActionPaused } from "../../types/Comptroller/Comptroller";

export function handleGloballyActionPaused(event: ActionPaused): void {
  log.info("ActionPaused event handled", []);
  log.info("param action: {}", [event.params.action.toString()]);
  log.info("param pauseState: {}", [event.params.pauseState.toString()]);
}
