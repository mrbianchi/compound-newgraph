import { log } from "@graphprotocol/graph-ts";
import { MantissaFactor } from "../../constants";
import { CompSupplySpeedUpdated } from "../../types/Comptroller/Comptroller";
import { getMarket, isNonFunctionalMarket } from "../../utils";
import { amountToDecimal } from "../../utils/amountToDecimal";

export function handleCompSupplySpeedUpdated(event: CompSupplySpeedUpdated): void {
  const marketId = event.params.cToken.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId, event);

  market.latestBlockNumber = event.block.number;
  market.latestBlockTimestamp = event.block.timestamp;
  market.compSpeedSupply = amountToDecimal(event.params.newSpeed, MantissaFactor);

  market.save();
}
