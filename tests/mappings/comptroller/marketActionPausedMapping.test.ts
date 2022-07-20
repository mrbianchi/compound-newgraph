import { Address, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, describe, newMockEvent, test } from "matchstick-as";
import { MarketActionTypes } from "../../../src/constants";
import { handleMarketActionPaused } from "../../../src/mappings/comptroller/marketActionPausedMapping";
import { ActionPaused1 } from "../../../src/types/Comptroller/Comptroller";
import { MarketBuilder, MarketDefaultValues } from "../../fixtures";

function createEvent(actionType: string): ActionPaused1 {
  const event = changetype<ActionPaused1>(newMockEvent());
  event.parameters.push(
    new ethereum.EventParam("cToken", ethereum.Value.fromAddress(Address.fromString(MarketDefaultValues.Id)))
  );
  event.parameters.push(new ethereum.EventParam("action", ethereum.Value.fromString(actionType)));
  event.parameters.push(new ethereum.EventParam("pauseState", ethereum.Value.fromBoolean(true)));
  return event;
}

describe("Comptroller ::: handleMarketActionPaused tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should create a Market if it doesn't exist", () => {
    const event = createEvent(MarketActionTypes.Mint);

    assert.entityCount("Market", 0);

    handleMarketActionPaused(event);

    assert.entityCount("Market", 1);
    assert.fieldEquals("Market", MarketDefaultValues.Id, "mintsPaused", true.toString());
  });

  test("It should pause mints on an existing Market", () => {
    const market = new MarketBuilder().withMintsPaused(false).build();
    const event = createEvent(MarketActionTypes.Mint);

    handleMarketActionPaused(event);

    assert.entityCount("Market", 1);
    assert.fieldEquals("Market", market.id, "mintsPaused", true.toString());
  });

  test("It should pause borrows on an existing Market", () => {
    const market = new MarketBuilder().withBorrowsPaused(false).build();
    const event = createEvent(MarketActionTypes.Borrow);

    handleMarketActionPaused(event);

    assert.entityCount("Market", 1);
    assert.fieldEquals("Market", market.id, "borrowsPaused", true.toString());
  });
});
