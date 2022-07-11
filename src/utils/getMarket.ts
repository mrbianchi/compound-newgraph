import { Market } from "../types/schema";
import { createMarket } from "./createMarket";

export function getMarket(marketId: string): Market {
  let market = Market.load(marketId);

  if (!market) {
    market = createMarket(marketId);
  }

  return market;
}
