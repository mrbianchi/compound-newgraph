import { ProposalStatuses } from "../../constants";
import { ProposalCreated } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";
import { Proposal } from "../../types/schema";

export function handleProposalCreated(event: ProposalCreated): void {
  const proposal = new Proposal(event.params.id.toString());

  proposal.status = ProposalStatuses.Active;
  proposal.proposer = event.params.proposer.toHexString();
  proposal.targets = event.params.targets.map<string>((target) => target.toHexString());
  proposal.values = event.params.values;
  proposal.signatures = event.params.signatures;
  proposal.calldatas = event.params.calldatas;
  proposal.startBlockNumber = event.params.startBlock;
  proposal.endBlockNumber = event.params.endBlock;
  proposal.description = event.params.description;

  proposal.save();
}
