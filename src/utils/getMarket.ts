import { ethereum } from "@graphprotocol/graph-ts";
import { Market } from "../types/schema";
import { createMarket } from "./createMarket";
import { getComptroller } from "./getComptroller";

export function getMarket(marketId: string, event: ethereum.Event): Market {
  let market = Market.load(marketId);

  if (!market) {
    const comptroller = getComptroller();
    const markets = comptroller.markets;
    market = createMarket(marketId, event);
    markets.push(market.id);
    comptroller.markets = markets;
    comptroller.save();
  }

  return market;
}
