import { log } from "@graphprotocol/graph-ts";
import { ProposalStatuses } from "../../constants";
import { ProposalCanceled } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";
import { Proposal } from "../../types/schema";

export function handleProposalCanceled(event: ProposalCanceled): void {
  const proposalId = event.params.id.toString();
  const proposal = Proposal.load(proposalId);

  if (!proposal) {
    log.error("Governance ::: ProposalCanceled ::: Proposal({}) not found", [proposalId]);
    return;
  }

  proposal.status = ProposalStatuses.Canceled;

  proposal.save();
}
