import { log } from "@graphprotocol/graph-ts";
import { NewInterestParams } from "../../../types/WhitePaperInterestRateModel/WhitePaperInterestRateModel";

export function handleNewInterestParams(event: NewInterestParams): void {
  log.info("NewAdmin event handled", []);
  log.info("param baseRatePerBlock: {}", [event.params.baseRatePerBlock.toString()]);
  log.info("param multiplierPerBlock: {}", [event.params.multiplierPerBlock.toString()]);
}
