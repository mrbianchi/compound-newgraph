import { log } from "@graphprotocol/graph-ts";
import { ProposalThresholdSet } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";

export function handleProposalThresholdSet(event: ProposalThresholdSet): void {
  log.info("ProposalThresholdSet event handled", []);
  log.info("param oldProposalThreshold: {}", [event.params.oldProposalThreshold.toString()]);
  log.info("param newProposalThreshold: {}", [event.params.newProposalThreshold.toString()]);
}
