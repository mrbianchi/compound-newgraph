import { log } from "@graphprotocol/graph-ts";
import { CompSupplySpeedUpdated } from "../../types/Comptroller/Comptroller";

export function handleCompSupplySpeedUpdated(event: CompSupplySpeedUpdated): void {
  log.info("CompSupplySpeedUpdated event handled", []);
  log.info("param cToken: {}", [event.params.cToken.toString()]);
  log.info("param newSpeed: {}", [event.params.newSpeed.toString()]);
}
