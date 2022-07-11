import { log } from "@graphprotocol/graph-ts";
import { NewImplementation } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";

export function handleNewImplementation(event: NewImplementation): void {
  log.info("NewImplementation event handled", []);
  log.info("param oldImplementation: {}", [event.params.oldImplementation.toHexString()]);
  log.info("param newImplementation: {}", [event.params.newImplementation.toHexString()]);
}
