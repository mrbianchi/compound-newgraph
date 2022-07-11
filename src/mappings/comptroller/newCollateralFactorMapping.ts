import { NewCollateralFactor } from "../../types/Comptroller/Comptroller";
import { getMarket, mantissaFactorBD } from "../../utils";

export function handleNewCollateralFactor(event: NewCollateralFactor): void {
  const marketId = event.params.cToken.toHexString();
  const market = getMarket(marketId);
  market.collateralFactor = event.params.newCollateralFactorMantissa.toBigDecimal().div(mantissaFactorBD);
  market.save();
}
