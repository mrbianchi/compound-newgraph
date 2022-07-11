import { log } from "@graphprotocol/graph-ts";
import { ProposalStatuses } from "../../constants";
import { ProposalQueued } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";
import { Proposal } from "../../types/schema";

export function handleProposalQueued(event: ProposalQueued): void {
  const proposalId = event.params.id.toString();
  const proposal = Proposal.load(proposalId);

  if (!proposal) {
    log.error("Governance ::: ProposalQueued ::: Proposal({}) not found", [proposalId]);
    return;
  }

  proposal.status = ProposalStatuses.Queued;

  proposal.save();
}
