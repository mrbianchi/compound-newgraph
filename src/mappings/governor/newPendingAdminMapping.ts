import { log } from "@graphprotocol/graph-ts";
import { NewPendingAdmin } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";

export function handleNewPendingAdmin(event: NewPendingAdmin): void {
  log.info("NewPendingAdmin event handled", []);
  log.info("param oldImplementation: {}", [event.params.oldPendingAdmin.toHexString()]);
  log.info("param newImplementation: {}", [event.params.newPendingAdmin.toHexString()]);
}
