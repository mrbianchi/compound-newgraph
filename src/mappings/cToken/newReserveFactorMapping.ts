import { log } from "@graphprotocol/graph-ts";
import { MantissaFactor, OneHundredBD } from "../../constants";
import { NewReserveFactor } from "../../types/templates/CToken/CToken";
import { getMarket, isNonFunctionalMarket } from "../../utils";
import { amountToDecimal } from "../../utils/amountToDecimal";

export function handleNewReserveFactor(event: NewReserveFactor): void {
  const marketId = event.address.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId, event);
  market.reserveFactorPercent = amountToDecimal(event.params.newReserveFactorMantissa, MantissaFactor).times(OneHundredBD);
  market.save();
}
