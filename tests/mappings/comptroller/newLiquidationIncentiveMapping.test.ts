import { BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, describe, newMockEvent, test } from "matchstick-as";
import { handleNewLiquidationIncentive } from "../../../src/mappings/comptroller/newLiquidationIncentiveMapping";
import { NewLiquidationIncentive } from "../../../src/types/Comptroller/Comptroller";
import { ComptrollerBuilder, ComptrollerDefaultValues } from "../../fixtures/comptrollerBuilder";

function createEvent(): NewLiquidationIncentive {
  const event = changetype<NewLiquidationIncentive>(newMockEvent());
  event.parameters.push(
    new ethereum.EventParam("oldLiquidationIncentive", ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(0)))
  );
  event.parameters.push(
    new ethereum.EventParam(
      "newLiquidationIncentive",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(ComptrollerDefaultValues.LiquidationIncentive))
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
      "liquidationIncentive",
      ComptrollerDefaultValues.LiquidationIncentive.toString()
    );
  });

  test("It should update an existing Comptroller", () => {
    const comptroller = new ComptrollerBuilder().withLiquidationIncentive(BigDecimal.fromString("1")).build();
    const event = createEvent();

    handleNewLiquidationIncentive(event);

    assert.entityCount("Comptroller", 1);
    assert.fieldEquals(
      "Comptroller",
      comptroller.id,
      "liquidationIncentive",
      ComptrollerDefaultValues.LiquidationIncentive.toString()
    );
  });
});
