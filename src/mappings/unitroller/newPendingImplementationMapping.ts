import { log } from "@graphprotocol/graph-ts";
import { NewPendingImplementation } from "../../types/Unitroller/Unitroller";

export function handleNewPendingImplementation(event: NewPendingImplementation): void {
  log.info("NewPendingImplementation event handled", []);
  log.info("param oldPendingImplementation: {}", [event.params.oldPendingImplementation.toString()]);
  log.info("param newPendingImplementation: {}", [event.params.newPendingImplementation.toString()]);
}
