import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, describe, newMockEvent, test } from "matchstick-as";
import { handleProposalCreated } from "../../../src/mappings/governance/proposalCreatedMapping";
import { ProposalCreated } from "../../../src/types/GovernorBravoDelegator/GovernorBravoDelegator";
import { ProposalDefaultValues } from "../../fixtures";
import { arrayToString } from "../../helpers";

function createEvent(): ProposalCreated {
  const event = changetype<ProposalCreated>(newMockEvent());
  event.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(BigInt.fromString(ProposalDefaultValues.Id)))
  );
  event.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(Address.fromString(ProposalDefaultValues.Proposer)))
  );
  event.parameters.push(
    new ethereum.EventParam(
      "targets",
      ethereum.Value.fromAddressArray(ProposalDefaultValues.Targets.map<Address>((target) => Address.fromString(target)))
    )
  );
  event.parameters.push(
    new ethereum.EventParam(
      "values",
      ethereum.Value.fromUnsignedBigIntArray(ProposalDefaultValues.Values.map<BigInt>((value) => BigInt.fromU64(value)))
    )
  );
  event.parameters.push(
    new ethereum.EventParam("signatures", ethereum.Value.fromStringArray(ProposalDefaultValues.Signatures))
  );
  event.parameters.push(
    new ethereum.EventParam(
      "calldatas",
      ethereum.Value.fromBytesArray(ProposalDefaultValues.CallDatas.map<Bytes>((callData) => Bytes.fromHexString(callData)))
    )
  );
  event.parameters.push(
    new ethereum.EventParam(
      "startBlock",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(ProposalDefaultValues.StartBlockNumber))
    )
  );
  event.parameters.push(
    new ethereum.EventParam("endBlock", ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(ProposalDefaultValues.EndBlockNumber)))
  );
  event.parameters.push(new ethereum.EventParam("description", ethereum.Value.fromString(ProposalDefaultValues.Description)));
  return event;
}

describe("Governance ::: handleProposalCreated tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should save the new proposal created", () => {
    const event = createEvent();

    assert.entityCount("Proposal", 0);

    handleProposalCreated(event);

    assert.entityCount("Proposal", 1);
    assert.fieldEquals("Proposal", ProposalDefaultValues.Id, "status", ProposalDefaultValues.Status);
    assert.fieldEquals("Proposal", ProposalDefaultValues.Id, "proposer", ProposalDefaultValues.Proposer);
    assert.fieldEquals("Proposal", ProposalDefaultValues.Id, "targets", arrayToString(ProposalDefaultValues.Targets));
    assert.fieldEquals("Proposal", ProposalDefaultValues.Id, "values", arrayToString(ProposalDefaultValues.Values));
    assert.fieldEquals("Proposal", ProposalDefaultValues.Id, "signatures", arrayToString(ProposalDefaultValues.Signatures));
    assert.fieldEquals("Proposal", ProposalDefaultValues.Id, "calldatas", arrayToString(ProposalDefaultValues.CallDatas));
    assert.fieldEquals(
      "Proposal",
      ProposalDefaultValues.Id,
      "startBlockNumber",
      ProposalDefaultValues.StartBlockNumber.toString()
    );
    assert.fieldEquals("Proposal", ProposalDefaultValues.Id, "endBlockNumber", ProposalDefaultValues.EndBlockNumber.toString());
    assert.fieldEquals("Proposal", ProposalDefaultValues.Id, "description", ProposalDefaultValues.Description);
  });
});
