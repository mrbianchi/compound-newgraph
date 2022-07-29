import { log } from "@graphprotocol/graph-ts";
import { MantissaFactor } from "../../constants";
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
  market.collateralFactor = amountToDecimal(event.params.newCollateralFactorMantissa, MantissaFactor);
  market.save();
}
