import { log } from "@graphprotocol/graph-ts";
import { NewReserveFactor } from "../../types/templates/CToken/CToken";
import { getMarket, isNonFunctionalMarket } from "../../utils";

export function handleNewReserveFactor(event: NewReserveFactor): void {
  const marketId = event.address.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId);
  market.reserveFactor = event.params.newReserveFactorMantissa;
  market.save();
}
