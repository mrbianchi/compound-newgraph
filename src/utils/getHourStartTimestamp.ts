import { BigInt } from "@graphprotocol/graph-ts";
import { SecondsPerHour } from "../constants";

export function getHourStartTimestamp(blockTimestamp: BigInt): BigInt {
  return blockTimestamp.div(SecondsPerHour).times(SecondsPerHour);
}
