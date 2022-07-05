import { log } from "@graphprotocol/graph-ts";
import { VoteCast } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";

export function handleVoteCast(event: VoteCast): void {
  log.info("VoteCast event handled", []);
  log.info("param voter: {}", [event.params.voter.toHexString()]);
  log.info("param proposalId: {}", [event.params.proposalId.toString()]);
  log.info("param support: {}", [event.params.support.toString()]);
  log.info("param votes: {}", [event.params.votes.toString()]);
  log.info("param reason: {}", [event.params.reason.toString()]);
}
