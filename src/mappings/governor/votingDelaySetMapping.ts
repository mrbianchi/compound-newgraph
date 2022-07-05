import { log } from "@graphprotocol/graph-ts";
import { VotingDelaySet } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";

export function handleVotingDelaySet(event: VotingDelaySet): void {
  log.info("VotingDelaySet event handled", []);
  log.info("param oldVotingDelay: {}", [event.params.oldVotingDelay.toString()]);
  log.info("param newVotingDelay: {}", [event.params.newVotingDelay.toString()]);
}
