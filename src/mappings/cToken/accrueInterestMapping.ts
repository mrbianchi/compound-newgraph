import { log } from "@graphprotocol/graph-ts";
import { AccrueInterest } from "../../types/templates/CToken/CToken";
import { getMarket, isNonFunctionalMarket, updateMarket } from "../../utils";

export function handleAccrueInterest(event: AccrueInterest): void {
  const marketId = event.address.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId);
  updateMarket(market, event.block);
}
