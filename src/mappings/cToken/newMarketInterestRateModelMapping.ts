import { log } from "@graphprotocol/graph-ts";
import { NewMarketInterestRateModel } from "../../types/templates/CToken/CToken";

export function handleNewMarketInterestRateModel(event: NewMarketInterestRateModel): void {
  log.info("NewMarketInterestRateModel event handled", []);
  log.info("param oldInterestRateModel: {}", [event.params.oldInterestRateModel.toHexString()]);
  log.info("param newInterestRateModel: {}", [event.params.newInterestRateModel.toHexString()]);
}
