import { log } from "@graphprotocol/graph-ts";
import { NewAdmin } from "../../types/Unitroller/Unitroller";

export function handleNewAdmin(event: NewAdmin): void {
  log.info("NewAdmin event handled", []);
  log.info("param oldAdmin: {}", [event.params.oldAdmin.toString()]);
  log.info("param newAdmin: {}", [event.params.newAdmin.toString()]);
}
