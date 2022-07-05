import { log } from "@graphprotocol/graph-ts";
import { ProposalCreated } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";

export function handleProposalCreated(event: ProposalCreated): void {
  log.info("ProposalCreated event handled", []);
  log.info("param id: {}", [event.params.id.toString()]);
  log.info("param proposer: {}", [event.params.proposer.toHexString()]);
  //log.info("param targets: {}", [event.params.targets.toHexString()]);
  //log.info("param values: {}", [event.params.values.toHexString()]);
  //log.info("param signatures: {}", [event.params.signatures.toHexString()]);
  //log.info("param calldatas: {}", [event.params.calldatas.toHexString()]);
  log.info("param startBlock: {}", [event.params.startBlock.toString()]);
  log.info("param endBlock: {}", [event.params.endBlock.toString()]);
  log.info("param description: {}", [event.params.description.toString()]);
}
