import { log } from "@graphprotocol/graph-ts";
import { NewDelay } from "../../types/Timelock/Timelock";

export function handleNewDelay(event: NewDelay): void {
  log.info("NewDelay event handled", []);
  log.info("param newDelay: {}", [event.params.newDelay.toString()]);
}
