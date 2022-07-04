import { log } from "@graphprotocol/graph-ts";
import { DelegateChanged } from "../../types/Comp/Comp";

export function handleDelegateChanged(event: DelegateChanged): void {
  log.info("DelegateChanged event handled", []);
  log.info("param delegator: {}", [event.params.delegator.toString()]);
  log.info("param fromDelegate: {}", [event.params.fromDelegate.toString()]);
  log.info("param toDelegate: {}", [event.params.toDelegate.toString()]);
}
