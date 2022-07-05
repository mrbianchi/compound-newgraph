import { log } from "@graphprotocol/graph-ts";
import { NewPendingAdmin } from "../../types/templates/CToken/CToken";

export function handleNewPendingAdmin(event: NewPendingAdmin): void {
  log.info("NewPendingAdmin event handled", []);
  log.info("param oldPendingAdmin: {}", [event.params.oldPendingAdmin.toHexString()]);
  log.info("param newPendingAdmin: {}", [event.params.newPendingAdmin.toHexString()]);
}
