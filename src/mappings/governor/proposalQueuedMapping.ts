import { log } from "@graphprotocol/graph-ts";
import { ProposalQueued } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";

export function handleProposalQueued(event: ProposalQueued): void {
  log.info("ProposalQueued event handled", []);
  log.info("param id: {}", [event.params.id.toString()]);
}
