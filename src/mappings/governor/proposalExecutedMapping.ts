import { log } from "@graphprotocol/graph-ts";
import { ProposalExecuted } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";

export function handleProposalExecuted(event: ProposalExecuted): void {
  log.info("ProposalExecuted event handled", []);
  log.info("param id: {}", [event.params.id.toString()]);
}
