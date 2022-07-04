import { log } from "@graphprotocol/graph-ts";
import { NewPendingAdmin } from "../../types/Unitroller/Unitroller";

export function handleNewPendingAdmin(event: NewPendingAdmin): void {
  log.info("NewPendingAdmin event handled", []);
  log.info("param oldPendingAdmin: {}", [event.params.oldPendingAdmin.toString()]);
  log.info("param newPendingAdmin: {}", [event.params.newPendingAdmin.toString()]);
}
