import { log } from "@graphprotocol/graph-ts";
import { CompGranted } from "../../types/Comptroller/Comptroller";

export function handleCompGranted(event: CompGranted): void {
  log.info("CompGranted event handled", []);
  log.info("param recipient: {}", [event.params.recipient.toHexString()]);
  log.info("param amount: {}", [event.params.amount.toString()]);
}
