import { log } from "@graphprotocol/graph-ts";
import { NewPauseGuardian } from "../../types/Comptroller/Comptroller";

export function handleNewPauseGuardian(event: NewPauseGuardian): void {
  log.info("NewPauseGuardian event handled", []);
  log.info("param oldPauseGuardian: {}", [event.params.oldPauseGuardian.toString()]);
  log.info("param newPauseGuardian: {}", [event.params.newPauseGuardian.toString()]);
}
