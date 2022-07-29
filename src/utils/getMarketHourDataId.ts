import { BigInt } from "@graphprotocol/graph-ts";
import { getHourStartTimestamp } from "./getHourStartTimestamp";

export function getMarketHourDataId(marketId: string, blockTimestamp: BigInt): string {
  return marketId.concat("-").concat(getHourStartTimestamp(blockTimestamp).toString());
}
