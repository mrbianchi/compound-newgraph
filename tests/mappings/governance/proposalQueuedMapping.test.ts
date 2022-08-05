import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, describe, newMockEvent, test } from "matchstick-as";
import { ProposalStatuses } from "../../../src/constants";
import { handleProposalQueued } from "../../../src/mappings/governance/proposalQueuedMapping";
import { ProposalQueued } from "../../../src/types/GovernorBravoDelegator/GovernorBravoDelegator";
import { ProposalBuilder, ProposalDefaultValues } from "../../fixtures";

function createEvent(): ProposalQueued {
  const event = changetype<ProposalQueued>(newMockEvent());
  event.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(BigInt.fromString(ProposalDefaultValues.Id)))
  );
  return event;
}

describe("Governance ::: handleProposalQueued tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should change the proposal status to queued", () => {
    const proposalBuilder = new ProposalBuilder();
    proposalBuilder.build();
    const event = createEvent();

    assert.entityCount("Proposal", 1);
    assert.fieldEquals("Proposal", ProposalDefaultValues.Id, "status", ProposalStatuses.Active);

    handleProposalQueued(event);

    assert.entityCount("Proposal", 1);
    assert.fieldEquals("Proposal", ProposalDefaultValues.Id, "status", ProposalStatuses.Queued);
  });

  test("It should log an error if the proposal doesn't exist", () => {
    const event = createEvent();

    assert.entityCount("Proposal", 0);

    handleProposalQueued(event);

    assert.entityCount("Proposal", 0);
    //TODO mock log.error call?
  });
});
