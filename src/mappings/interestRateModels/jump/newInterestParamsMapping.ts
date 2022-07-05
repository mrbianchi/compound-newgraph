import { log } from "@graphprotocol/graph-ts";
import { NewInterestParams } from "../../../types/JumpRateModel/JumpRateModel";

export function handleNewInterestParams(event: NewInterestParams): void {
  log.info("NewAdmin event handled", []);
  log.info("param baseRatePerBlock: {}", [event.params.baseRatePerBlock.toString()]);
  log.info("param multiplierPerBlock: {}", [event.params.multiplierPerBlock.toString()]);
  log.info("param jumpMultiplierPerBlock: {}", [event.params.jumpMultiplierPerBlock.toString()]);
  log.info("param kink: {}", [event.params.kink.toString()]);
}
