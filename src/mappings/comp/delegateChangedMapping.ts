import { log } from "@graphprotocol/graph-ts";
import { DelegateChanged } from "../../types/Comp/Comp";

export function handleDelegateChanged(event: DelegateChanged): void {
  log.info("DelegateChanged event handled", []);
  log.info("param delegator: {}", [event.params.delegator.toHexString()]);
  log.info("param fromDelegate: {}", [event.params.fromDelegate.toHexString()]);
  log.info("param toDelegate: {}", [event.params.toDelegate.toHexString()]);
}
