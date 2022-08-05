import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
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
    new ethereum.EventParam(
      "newSpeed",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString(MarketDefaultValues.CompSpeedBorrowPerBlock.toString()))
    )
  );
  return event;
}

describe("Comptroller ::: handleCompBorrowSpeedUpdated tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should update an existing Market", () => {
    const market = new MarketBuilder().withCompSpeedBorrowPerBlock(BigDecimal.fromString("1234")).build();
    const event = createEvent();

    handleCompBorrowSpeedUpdated(event);

    assert.entityCount("Market", 1);
    assert.fieldEquals("Market", market.id, "compSpeedBorrowPerBlock", "0");
  });
});
