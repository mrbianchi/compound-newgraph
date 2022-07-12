import { NewMarketInterestRateModel } from "../../types/templates/CToken/CToken";
import { getMarket } from "../../utils";

export function handleNewMarketInterestRateModel(event: NewMarketInterestRateModel): void {
  const marketId = event.address.toHexString();
  const market = getMarket(marketId);
  market.interestRateModelAddress = event.params.newInterestRateModel;
  market.save();
}
