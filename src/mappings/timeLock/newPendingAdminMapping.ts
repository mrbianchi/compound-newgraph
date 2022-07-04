import { log } from "@graphprotocol/graph-ts";
import { NewPendingAdmin } from "../../types/Timelock/Timelock";

export function handleNewPendingAdmin(event: NewPendingAdmin): void {
  log.info("NewPendingAdmin event handled", []);
  log.info("param newPendingAdmin: {}", [event.params.newPendingAdmin.toString()]);
}
