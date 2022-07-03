import { log } from "@graphprotocol/graph-ts";
import { NewCollateralFactor } from "../../types/Comptroller/Comptroller";
import { Market } from "../../types/schema";
import { mantissaFactorBD } from "../../utils";

export function handleNewCollateralFactor(event: NewCollateralFactor): void {
  const market = Market.load(event.params.cToken.toHexString());

  if (!market) {
    log.info("Market({}) not found", [event.params.cToken.toString()]);
    return;
  }

  market.collateralFactor = event.params.newCollateralFactorMantissa.toBigDecimal().div(mantissaFactorBD);
  market.save();
}
