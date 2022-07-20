import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, describe, newMockEvent, test } from "matchstick-as";
import { handleNewLiquidationIncentive } from "../../../src/mappings/comptroller/newLiquidationIncentiveMapping";
import { NewLiquidationIncentive } from "../../../src/types/Comptroller/Comptroller";
import { ComptrollerBuilder, ComptrollerDefaultValues } from "../../fixtures/comptrollerBuilder";

function createEvent(): NewLiquidationIncentive {
  const event = changetype<NewLiquidationIncentive>(newMockEvent());
  event.parameters.push(
    new ethereum.EventParam("oldLiquidationIncentiveMantissa", ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(0)))
  );
  event.parameters.push(
    new ethereum.EventParam(
      "newLiquidationIncentiveMantissa",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(ComptrollerDefaultValues.LiquidationIncentiveMantissa))
    )
  );
  return event;
}

describe("Comptroller ::: handleNewLiquidationIncentive tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should create Comptroller if it doesn't exist", () => {
    const event = createEvent();

    assert.entityCount("Comptroller", 0);

    handleNewLiquidationIncentive(event);

    assert.entityCount("Comptroller", 1);
    assert.fieldEquals(
      "Comptroller",
      ComptrollerDefaultValues.Id,
      "liquidationIncentiveMantissa",
      ComptrollerDefaultValues.LiquidationIncentiveMantissa.toString()
    );
  });

  test("It should update an existing Comptroller", () => {
    const comptroller = new ComptrollerBuilder().withLiquidationIncentiveMantissa(0).build();
    const event = createEvent();

    handleNewLiquidationIncentive(event);

    assert.entityCount("Comptroller", 1);
    assert.fieldEquals(
      "Comptroller",
      comptroller.id,
      "liquidationIncentiveMantissa",
      ComptrollerDefaultValues.LiquidationIncentiveMantissa.toString()
    );
  });
});
