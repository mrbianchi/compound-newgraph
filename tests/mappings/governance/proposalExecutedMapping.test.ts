import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, describe, newMockEvent, test } from "matchstick-as";
import { ProposalStatuses } from "../../../src/constants";
import { handleProposalExecuted } from "../../../src/mappings/governance/proposalExecutedMapping";
import { ProposalExecuted } from "../../../src/types/GovernorBravoDelegator/GovernorBravoDelegator";
import { ProposalBuilder, ProposalDefaultValues } from "../../fixtures";

function createEvent(): ProposalExecuted {
  const event = changetype<ProposalExecuted>(newMockEvent());
  event.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(BigInt.fromString(ProposalDefaultValues.Id)))
  );
  return event;
}

describe("Governance ::: handleProposalExecuted tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should change the proposal status to executed", () => {
    const proposalBuilder = new ProposalBuilder();
    proposalBuilder.build();
    const event = createEvent();

    assert.entityCount("Proposal", 1);
    assert.fieldEquals("Proposal", ProposalDefaultValues.Id, "status", ProposalStatuses.Active);

    handleProposalExecuted(event);

    assert.entityCount("Proposal", 1);
    assert.fieldEquals("Proposal", ProposalDefaultValues.Id, "status", ProposalStatuses.Executed);
  });

  test("It should log an error if the proposal doesn't exist", () => {
    const event = createEvent();

    assert.entityCount("Proposal", 0);

    handleProposalExecuted(event);

    assert.entityCount("Proposal", 0);
    //TODO mock log.error call?
  });
});
