import { NewReserveFactor } from "../../types/templates/CToken/CToken";
import { getMarket } from "../../utils";

export function handleNewReserveFactor(event: NewReserveFactor): void {
  const marketId = event.address.toHexString();
  const market = getMarket(marketId);
  market.reserveFactor = event.params.newReserveFactorMantissa;
  market.save();
}
