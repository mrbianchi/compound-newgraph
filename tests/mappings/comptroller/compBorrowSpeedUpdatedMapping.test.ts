import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, describe, newMockEvent, test } from "matchstick-as";
import { handleCompBorrowSpeedUpdated } from "../../../src/mappings/comptroller/compBorrowSpeedUpdatedMapping";
import { CompBorrowSpeedUpdated } from "../../../src/types/Comptroller/Comptroller";
import { MarketBuilder, MarketDefaultValues } from "../../fixtures";

function createEvent(): CompBorrowSpeedUpdated {
  const event = changetype<CompBorrowSpeedUpdated>(newMockEvent());
  event.parameters.push(
    new ethereum.EventParam("cToken", ethereum.Value.fromAddress(Address.fromString(MarketDefaultValues.Id)))
  );

  event.parameters.push(
    new ethereum.EventParam("newSpeed", ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(MarketDefaultValues.CompBorrowSpeed)))
  );
  return event;
}

describe("Comptroller ::: handleCompBorrowSpeedUpdated tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should create ther market if it doesn't exist", () => {
    const event = createEvent();

    assert.entityCount("Market", 0);

    handleCompBorrowSpeedUpdated(event);

    assert.entityCount("Market", 1);
    assert.fieldEquals("Market", MarketDefaultValues.Id, "compBorrowSpeed", MarketDefaultValues.CompBorrowSpeed.toString());
  });

  test("It should update an existing Market", () => {
    const market = new MarketBuilder().withCompBorrowSpeed(1234).build();
    const event = createEvent();

    handleCompBorrowSpeedUpdated(event);

    assert.entityCount("Market", 1);
    assert.fieldEquals("Market", market.id, "compBorrowSpeed", "1234");
  });
});
