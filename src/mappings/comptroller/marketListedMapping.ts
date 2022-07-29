import { log } from "@graphprotocol/graph-ts";
import { MarketListed } from "../../types/Comptroller/Comptroller";
import { createMarket, isNonFunctionalMarket } from "../../utils";

export function handleMarketListed(event: MarketListed): void {
  const marketId = event.params.cToken.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = createMarket(marketId, event);
  market.save();
}
