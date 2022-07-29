import { BigInt } from "@graphprotocol/graph-ts";
import { MarketHourData } from "../types/schema";
import { createMarketHourData } from "./createMarketHourData";
import { getMarketHourDataId } from "./getMarketHourDataId";

export function getMarketHourData(marketId: string, blockTimestamp: BigInt): MarketHourData {
  const marketHourDataId = getMarketHourDataId(marketId, blockTimestamp);
  let marketHourData = MarketHourData.load(marketHourDataId);

  if (!marketHourData) {
    marketHourData = createMarketHourData(marketId, blockTimestamp);
  }

  return marketHourData;
}
