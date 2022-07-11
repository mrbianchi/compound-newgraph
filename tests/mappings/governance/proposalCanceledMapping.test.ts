import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, describe, newMockEvent, test } from "matchstick-as";
import { ProposalStatuses } from "../../../src/constants";
import { handleProposalCanceled } from "../../../src/mappings/governance/proposalCanceledMapping";
import { ProposalCanceled } from "../../../src/types/GovernorBravoDelegator/GovernorBravoDelegator";
import { ProposalBuilder, ProposalDefaultValues } from "../../fixtures";

function createEvent(): ProposalCanceled {
  const event = changetype<ProposalCanceled>(newMockEvent());
  event.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(BigInt.fromString(ProposalDefaultValues.Id)))
  );
  return event;
}

describe("Governance ::: handleProposalCanceled tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should change the proposal status to canceled", () => {
    const proposalBuilder = new ProposalBuilder();
    proposalBuilder.build();
    const event = createEvent();

    assert.entityCount("Proposal", 1);
    assert.fieldEquals("Proposal", ProposalDefaultValues.Id, "status", ProposalStatuses.Active);

    handleProposalCanceled(event);

    assert.entityCount("Proposal", 1);
    assert.fieldEquals("Proposal", ProposalDefaultValues.Id, "status", ProposalStatuses.Canceled);
  });

  test("It should log an error if the proposal doesn't exist", () => {
    const event = createEvent();

    assert.entityCount("Proposal", 0);

    handleProposalCanceled(event);

    assert.entityCount("Proposal", 0);
    //TODO mock log.error call?
  });
});
