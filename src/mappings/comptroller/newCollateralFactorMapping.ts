import { log } from "@graphprotocol/graph-ts";
import { MantissaFactor, OneHundredBD } from "../../constants";
import { NewCollateralFactor } from "../../types/Comptroller/Comptroller";
import { getMarket, isNonFunctionalMarket } from "../../utils";
import { amountToDecimal } from "../../utils/amountToDecimal";

export function handleNewCollateralFactor(event: NewCollateralFactor): void {
  const marketId = event.params.cToken.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId, event);

  market.latestBlockNumber = event.block.number;
  market.latestBlockTimestamp = event.block.timestamp;
  market.collateralFactorPercent = amountToDecimal(event.params.newCollateralFactorMantissa, MantissaFactor).times(
    OneHundredBD
  );

  market.save();
}
