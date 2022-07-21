import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, describe, newMockEvent, test } from "matchstick-as";
import { handleCompSupplySpeedUpdated } from "../../../src/mappings/comptroller/compSupplySpeedUpdatedMapping";
import { CompSupplySpeedUpdated } from "../../../src/types/Comptroller/Comptroller";
import { MarketBuilder, MarketDefaultValues } from "../../fixtures";

function createEvent(): CompSupplySpeedUpdated {
  const event = changetype<CompSupplySpeedUpdated>(newMockEvent());
  event.parameters.push(
    new ethereum.EventParam("cToken", ethereum.Value.fromAddress(Address.fromString(MarketDefaultValues.Id)))
  );
  event.parameters.push(
    new ethereum.EventParam("newSpeed", ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(MarketDefaultValues.CompSupplySpeed)))
  );
  return event;
}

describe("Comptroller ::: handleCompSupplySpeedUpdated tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should update an existing Market", () => {
    const market = new MarketBuilder().withCompBorrowSpeed(1234).build();
    const event = createEvent();

    handleCompSupplySpeedUpdated(event);

    assert.entityCount("Market", 1);
    assert.fieldEquals("Market", market.id, "compSupplySpeed", "0");
  });
});
