import { log } from "@graphprotocol/graph-ts";
import { VotingPeriodSet } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";

export function handleVotingPeriodSet(event: VotingPeriodSet): void {
  log.info("VotingPeriodSet event handled", []);
  log.info("param oldVotingPeriod: {}", [event.params.oldVotingPeriod.toString()]);
  log.info("param newVotingPeriod: {}", [event.params.newVotingPeriod.toString()]);
}
