import { ethereum } from "@graphprotocol/graph-ts";
import { Market } from "../types/schema";
import { createMarket } from "./createMarket";

export function getMarket(marketId: string, event: ethereum.Event): Market {
  let market = Market.load(marketId);

  if (!market) {
    market = createMarket(marketId, event);
  }

  return market;
}
