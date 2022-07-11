import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, describe, newMockEvent, test } from "matchstick-as";
import { handleNewReserveFactor } from "../../../src/mappings/cToken/newReserveFactorMapping";
import { NewReserveFactor } from "../../../src/types/templates/CToken/CToken";

function createEvent(oldReserveFactorMantissa: i32, newReserveFactorMantissa: i32): NewReserveFactor {
  const event = changetype<NewReserveFactor>(newMockEvent());
  const oldReserveFactorMantissaParam = new ethereum.EventParam(
    "oldReserveFactorMantissa",
    ethereum.Value.fromUnsignedBigInt(new BigInt(oldReserveFactorMantissa))
  );
  const newReserveFactorMantissaParam = new ethereum.EventParam(
    "newPriceOracle",
    ethereum.Value.fromUnsignedBigInt(new BigInt(newReserveFactorMantissa))
  );

  event.parameters = [];
  event.parameters.push(oldReserveFactorMantissaParam);
  event.parameters.push(newReserveFactorMantissaParam);
  return event;
}

describe("cToken ::: handleNewReserveFactor tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should log an error if the market doesn't exist", () => {
    const event = createEvent(0, 1);

    assert.entityCount("Market", 0);

    handleNewReserveFactor(event);

    assert.entityCount("Market", 0);
  });
});
