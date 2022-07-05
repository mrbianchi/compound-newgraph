import { log } from "@graphprotocol/graph-ts";
import { NewAdmin } from "../../types/templates/CToken/CToken";

export function handleNewAdmin(event: NewAdmin): void {
  log.info("NewAdmin event handled", []);
  log.info("param oldAdmin: {}", [event.params.oldAdmin.toHexString()]);
  log.info("param newAdmin: {}", [event.params.newAdmin.toHexString()]);
}
