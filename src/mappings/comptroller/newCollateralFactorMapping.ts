import { log } from "@graphprotocol/graph-ts";
import { NewCollateralFactor } from "../../types/Comptroller/Comptroller";
import { Market } from "../../types/schema";
import { mantissaFactorBD } from "../../utils";

export function handleNewCollateralFactor(event: NewCollateralFactor): void {
  const marketId = event.params.cToken.toHexString();
  const market = Market.load(marketId);

  if (!market) {
    log.error("Comptroller ::: NewCollateralFactor ::: Market({}) not found", [marketId]);
    return;
  }

  market.collateralFactor = event.params.newCollateralFactorMantissa.toBigDecimal().div(mantissaFactorBD);
  market.save();
}
