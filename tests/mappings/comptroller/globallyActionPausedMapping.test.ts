import { ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, describe, newMockEvent, test } from "matchstick-as";
import { GlobalActionTypes } from "../../../src/constants";
import { handleGloballyActionPaused } from "../../../src/mappings/comptroller/globallyActionPausedMapping";
import { ActionPaused } from "../../../src/types/Comptroller/Comptroller";
import { ComptrollerBuilder, ComptrollerDefaultValues } from "../../fixtures/comptrollerBuilder";

function createEvent(actionType: string): ActionPaused {
  const event = changetype<ActionPaused>(newMockEvent());
  event.parameters.push(new ethereum.EventParam("action", ethereum.Value.fromString(actionType)));
  event.parameters.push(new ethereum.EventParam("pauseState", ethereum.Value.fromBoolean(true)));
  return event;
}

describe("Comptroller ::: handleGloballyActionPaused tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should create Comptroller if it doesn't exist", () => {
    const event = createEvent(GlobalActionTypes.Transfer);

    assert.entityCount("Comptroller", 0);

    handleGloballyActionPaused(event);

    assert.entityCount("Comptroller", 1);
    assert.fieldEquals("Comptroller", ComptrollerDefaultValues.Id, "transfersPaused", true.toString());
  });

  test("It should pause tranfers on an existing Comptroller", () => {
    const comptroller = new ComptrollerBuilder().withTransfersPaused(false).build();
    const event = createEvent(GlobalActionTypes.Transfer);

    handleGloballyActionPaused(event);

    assert.entityCount("Comptroller", 1);
    assert.fieldEquals("Comptroller", comptroller.id, "transfersPaused", true.toString());
  });

  test("It should pause seizes on an existing Comptroller", () => {
    const comptroller = new ComptrollerBuilder().withSeizesPaused(false).build();
    const event = createEvent(GlobalActionTypes.Seize);

    handleGloballyActionPaused(event);

    assert.entityCount("Comptroller", 1);
    assert.fieldEquals("Comptroller", comptroller.id, "seizesPaused", true.toString());
  });
});
