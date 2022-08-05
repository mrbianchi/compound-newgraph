import { Address, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, describe, newMockEvent, test } from "matchstick-as";
import { NullAddress, NullAddressString } from "../../../src/constants";
import { handleNewPriceOracle } from "../../../src/mappings/comptroller/newPriceOracleMapping";
import { NewPriceOracle } from "../../../src/types/Comptroller/Comptroller";
import { ComptrollerBuilder, ComptrollerDefaultValues } from "../../fixtures/comptrollerBuilder";

function createEvent(): NewPriceOracle {
  const event = changetype<NewPriceOracle>(newMockEvent());
  event.parameters.push(new ethereum.EventParam("newPriceOracle", ethereum.Value.fromAddress(NullAddress)));
  event.parameters.push(
    new ethereum.EventParam(
      "newPriceOracle",
      ethereum.Value.fromAddress(Address.fromString(ComptrollerDefaultValues.PriceOracleAddress))
    )
  );
  return event;
}

describe("Comptroller ::: handleNewPriceOracle tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should create Comptroller with Id 1 if it doesn't exist", () => {
    const event = createEvent();

    assert.entityCount("Comptroller", 0);

    handleNewPriceOracle(event);

    assert.entityCount("Comptroller", 1);
    assert.fieldEquals(
      "Comptroller",
      ComptrollerDefaultValues.Id,
      "priceOracleAddress",
      ComptrollerDefaultValues.PriceOracleAddress
    );
  });

  test("It should update an existing Comptroller", () => {
    const comptroller = new ComptrollerBuilder().withPriceOracleAddress(NullAddressString).build();
    const event = createEvent();

    handleNewPriceOracle(event);

    assert.entityCount("Comptroller", 1);
    assert.fieldEquals("Comptroller", comptroller.id, "priceOracleAddress", ComptrollerDefaultValues.PriceOracleAddress);
  });
});
