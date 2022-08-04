import { ethereum } from "@graphprotocol/graph-ts";
import { Market } from "../types/schema";
import { updateComptrollerHistoricalData } from "./updateComptrollerHistoricalData";
import { updateComptrollerlSummaryData } from "./updateComptrollerlSummaryData";
import { updateMarketHistoricalData } from "./updateMarketHistoricalData";

export function updateAllHistoricalData(market: Market, event: ethereum.Event): void {
  updateComptrollerlSummaryData(event);
  updateMarketHistoricalData(market, event);
  updateComptrollerHistoricalData(event);
}
