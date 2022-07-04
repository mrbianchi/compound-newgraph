import { log } from "@graphprotocol/graph-ts";
import { CompReceivableUpdated } from "../../types/Comptroller/Comptroller";

export function handleCompReceivableUpdated(event: CompReceivableUpdated): void {
  log.info("CompReceivableUpdated event handled", []);
  log.info("param user: {}", [event.params.user.toHexString()]);
  log.info("param oldCompReceivable: {}", [event.params.oldCompReceivable.toString()]);
  log.info("param newCompReceivable: {}", [event.params.newCompReceivable.toString()]);
}
