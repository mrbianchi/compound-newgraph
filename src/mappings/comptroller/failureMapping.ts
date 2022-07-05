import { log } from "@graphprotocol/graph-ts";
import { Failure } from "../../types/Comptroller/Comptroller";

export function handleFailure(event: Failure): void {
  log.info("Failure event handled", []);
  log.info("param error: {}", [event.params.error.toString()]);
  log.info("param info: {}", [event.params.info.toString()]);
  log.info("param detail: {}", [event.params.detail.toString()]);
}
