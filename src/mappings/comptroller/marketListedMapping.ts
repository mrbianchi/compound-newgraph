import { MarketListed } from "../../types/Comptroller/Comptroller";
import { createMarket } from "../../utils";

export function handleMarketListed(event: MarketListed): void {
  const market = createMarket(event.params.cToken.toHexString());
  market.save();
}
