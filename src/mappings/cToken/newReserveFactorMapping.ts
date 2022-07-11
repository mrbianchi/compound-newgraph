import { log } from "@graphprotocol/graph-ts";
import { Market } from "../../types/schema";
import { NewReserveFactor } from "../../types/templates/CToken/CToken";

export function handleNewReserveFactor(event: NewReserveFactor): void {
  const marketAddress = event.address.toHexString();
  const market = Market.load(marketAddress);

  if (!market) {
    log.error("cToken ::: NewReserveFactor ::: Market({}) not found", [marketAddress]);
    return;
  }

  market.reserveFactor = event.params.newReserveFactorMantissa;
  market.save();
}
