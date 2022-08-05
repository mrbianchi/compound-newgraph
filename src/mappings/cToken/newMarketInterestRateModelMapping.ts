import { log } from "@graphprotocol/graph-ts";
import { NewMarketInterestRateModel } from "../../types/templates/CToken/CToken";
import { getMarket, isNonFunctionalMarket } from "../../utils";

export function handleNewMarketInterestRateModel(event: NewMarketInterestRateModel): void {
  const marketId = event.address.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId, event);
  market.interestRateModelAddress = event.params.newInterestRateModel;
  market.save();
}
