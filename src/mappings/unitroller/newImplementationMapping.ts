import { log } from "@graphprotocol/graph-ts";
import { NewImplementation } from "../../types/Unitroller/Unitroller";

export function handleNewImplementation(event: NewImplementation): void {
  log.info("NewImplementation event handled", []);
  log.info("param oldImplementation: {}", [event.params.oldImplementation.toString()]);
  log.info("param newImplementation: {}", [event.params.newImplementation.toString()]);
}
