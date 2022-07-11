import { log } from "@graphprotocol/graph-ts";
import { NewAdmin } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";

export function handleNewAdmin(event: NewAdmin): void {
  log.info("NewAdmin event handled", []);
  log.info("param oldAdmin: {}", [event.params.oldAdmin.toHexString()]);
  log.info("param newAdmin: {}", [event.params.newAdmin.toHexString()]);
}
