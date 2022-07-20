import { log } from "@graphprotocol/graph-ts";
import { MantissaFactorBD } from "../../constants";
import { NewCollateralFactor } from "../../types/Comptroller/Comptroller";
import { getMarket, isNonFunctionalMarket } from "../../utils";

export function handleNewCollateralFactor(event: NewCollateralFactor): void {
  const marketId = event.params.cToken.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId);
  market.collateralFactor = event.params.newCollateralFactorMantissa.toBigDecimal().div(MantissaFactorBD);
  market.save();
}
