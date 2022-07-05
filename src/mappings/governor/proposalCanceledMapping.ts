import { log } from "@graphprotocol/graph-ts";
import { ProposalCanceled } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";

export function handleProposalCanceled(event: ProposalCanceled): void {
  log.info("ProposalCanceled event handled", []);
  log.info("param id: {}", [event.params.id.toString()]);
}
