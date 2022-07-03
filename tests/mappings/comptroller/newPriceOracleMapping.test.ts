import { Address, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, describe, newMockEvent, test } from "matchstick-as";
import { handleNewPriceOracle } from "../../../src/mappings/comptroller/newPriceOracleMapping";
import { NewPriceOracle } from "../../../src/types/Comptroller/Comptroller";
import { Comptroller } from "../../../src/types/schema";

function createNewPriceOracleEvent(oldPriceOracleAddress: string, newPriceOracleAddress: string): NewPriceOracle {
  const newPriceOracleEvent = changetype<NewPriceOracle>(newMockEvent());
  const oldPriceOracleAddressParam = new ethereum.EventParam(
    "newPriceOracle",
    ethereum.Value.fromAddress(Address.fromString(oldPriceOracleAddress)),
  );
  const newPriceOracleAddressParam = new ethereum.EventParam(
    "newPriceOracle",
    ethereum.Value.fromAddress(Address.fromString(newPriceOracleAddress)),
  );

  newPriceOracleEvent.parameters = [];
  newPriceOracleEvent.parameters.push(oldPriceOracleAddressParam);
  newPriceOracleEvent.parameters.push(newPriceOracleAddressParam);
  return newPriceOracleEvent;
}

describe("handleNewPriceOracle tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should create Comptroller with ID 1 if it doesn't exist", () => {
    const newPriceOracleEvent = createNewPriceOracleEvent(
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000001",
    );

    assert.entityCount("Comptroller", 0);

    handleNewPriceOracle(newPriceOracleEvent);

    assert.entityCount("Comptroller", 1);
    assert.fieldEquals("Comptroller", "1", "priceOracle", "0x0000000000000000000000000000000000000001");
  });

  test("It should update an existing Comptroller", () => {
    const comptroller = new Comptroller("1");
    comptroller.priceOracle = Address.fromString("0x0000000000000000000000000000000000000000");
    comptroller.save();

    const newPriceOracleEvent = createNewPriceOracleEvent(
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000001",
    );

    handleNewPriceOracle(newPriceOracleEvent);

    assert.entityCount("Comptroller", 1);
    assert.fieldEquals("Comptroller", "1", "priceOracle", "0x0000000000000000000000000000000000000001");
  });
});
