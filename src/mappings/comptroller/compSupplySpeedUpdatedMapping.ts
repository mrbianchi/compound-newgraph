import { log } from "@graphprotocol/graph-ts";
import { CompSupplySpeedUpdated } from "../../types/Comptroller/Comptroller";
import { getMarket, isNonFunctionalMarket } from "../../utils";

export function handleCompSupplySpeedUpdated(event: CompSupplySpeedUpdated): void {
  const marketId = event.params.cToken.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId);
  market.compSupplySpeed = event.params.newSpeed;
  market.save();
}
