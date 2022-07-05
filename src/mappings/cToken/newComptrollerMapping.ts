import { log } from "@graphprotocol/graph-ts";
import { NewComptroller } from "../../types/templates/CToken/CToken";

export function handleNewComptroller(event: NewComptroller): void {
  log.info("NewComptroller event handled", []);
  log.info("param oldComptroller: {}", [event.params.oldComptroller.toHexString()]);
  log.info("param newComptroller: {}", [event.params.newComptroller.toHexString()]);
}
