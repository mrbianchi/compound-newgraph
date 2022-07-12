import { AccrueInterest } from "../../types/templates/CToken/CToken";
import { getMarket, updateMarket } from "../../utils";

export function handleAccrueInterest(event: AccrueInterest): void {
  const marketId = event.address.toHexString();
  const market = getMarket(marketId);
  updateMarket(market, event.block);
}
