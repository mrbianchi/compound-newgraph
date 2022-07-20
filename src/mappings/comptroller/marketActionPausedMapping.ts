import { log } from "@graphprotocol/graph-ts";
import { MarketActionTypes } from "../../constants";
import { ActionPaused1 } from "../../types/Comptroller/Comptroller";
import { getMarket, isNonFunctionalMarket } from "../../utils";

export function handleMarketActionPaused(event: ActionPaused1): void {
  const marketId = event.params.cToken.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId);

  if (event.params.action == MarketActionTypes.Mint) {
    market.mintsPaused = event.params.pauseState;
  } else if (event.params.action == MarketActionTypes.Borrow) {
    market.borrowsPaused = event.params.pauseState;
  }

  market.save();
}
