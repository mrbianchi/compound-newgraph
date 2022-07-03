import { log } from "@graphprotocol/graph-ts";
import { CompBorrowSpeedUpdated } from "../../types/Comptroller/Comptroller";

export function handleCompBorrowSpeedUpdated(event: CompBorrowSpeedUpdated): void {
  log.info("CompBorrowSpeedUpdated event handled", []);
  log.info("param cToken: {}", [event.params.cToken.toString()]);
  log.info("param newSpeed: {}", [event.params.newSpeed.toString()]);
}
