import { log } from "@graphprotocol/graph-ts";
import { ProposalStatuses } from "../../constants";
import { ProposalExecuted } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";
import { Proposal } from "../../types/schema";

export function handleProposalExecuted(event: ProposalExecuted): void {
  const proposalId = event.params.id.toString();
  const proposal = Proposal.load(proposalId);

  if (!proposal) {
    log.error("Governance ::: ProposalExecuted ::: Proposal({}) not found", [proposalId]);
    return;
  }

  proposal.status = ProposalStatuses.Executed;

  proposal.save();
}
