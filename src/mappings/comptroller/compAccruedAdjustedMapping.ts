import { log } from "@graphprotocol/graph-ts";
import { CompAccruedAdjusted } from "../../types/Comptroller/Comptroller";

export function handleCompAccruedAdjusted(event: CompAccruedAdjusted): void {
  log.info("CompAccruedAdjusted event handled", []);
  log.info("param user: {}", [event.params.user.toString()]);
  log.info("param oldCompAccrued: {}", [event.params.oldCompAccrued.toString()]);
  log.info("param newCompAccrued: {}", [event.params.newCompAccrued.toString()]);
}
