import { log } from "@graphprotocol/graph-ts";
import { NewAdmin } from "../../types/Timelock/Timelock";

export function handleNewAdmin(event: NewAdmin): void {
  log.info("NewAdmin event handled", []);
  log.info("param newAdmin: {}", [event.params.newAdmin.toString()]);
}
