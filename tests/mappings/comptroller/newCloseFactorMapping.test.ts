import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, describe, newMockEvent, test } from "matchstick-as";
import { handleNewCloseFactor } from "../../../src/mappings/comptroller/newCloseFactorMapping";
import { NewCloseFactor } from "../../../src/types/Comptroller/Comptroller";
import { ComptrollerBuilder, ComptrollerDefaultValues } from "../../fixtures/comptrollerBuilder";

function createEvent(): NewCloseFactor {
  const event = changetype<NewCloseFactor>(newMockEvent());
  event.parameters.push(
    new ethereum.EventParam("oldCloseFactorMantissa", ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(0)))
  );
  event.parameters.push(
    new ethereum.EventParam(
      "newCloseFactorMantissa",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(ComptrollerDefaultValues.CloseFactorMantissa))
    )
  );
  return event;
}

describe("Comptroller ::: handleNewCloseFactor tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should create Comptroller if it doesn't exist", () => {
    const event = createEvent();

    assert.entityCount("Comptroller", 0);

    handleNewCloseFactor(event);

    assert.entityCount("Comptroller", 1);
    assert.fieldEquals(
      "Comptroller",
      ComptrollerDefaultValues.Id,
      "closeFactorMantissa",
      ComptrollerDefaultValues.CloseFactorMantissa.toString()
    );
  });

  test("It should update an existing Comptroller", () => {
    const comptroller = new ComptrollerBuilder().withCloseFactorMantissa(0).build();
    const event = createEvent();

    handleNewCloseFactor(event);

    assert.entityCount("Comptroller", 1);
    assert.fieldEquals(
      "Comptroller",
      comptroller.id,
      "closeFactorMantissa",
      ComptrollerDefaultValues.CloseFactorMantissa.toString()
    );
  });
});
