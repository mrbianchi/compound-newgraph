import { log } from "@graphprotocol/graph-ts";
import { DelegateVotesChanged } from "../../types/Comp/Comp";

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  log.info("DelegateVotesChanged event handled", []);
  log.info("param delegate: {}", [event.params.delegate.toString()]);
  log.info("param previousBalance: {}", [event.params.previousBalance.toString()]);
  log.info("param newBalance: {}", [event.params.newBalance.toString()]);
}
