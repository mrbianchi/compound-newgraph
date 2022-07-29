import { BigInt } from "@graphprotocol/graph-ts";
import { DefaultComptrollerId } from "../constants";
import { getHourStartTimestamp } from "./getHourStartTimestamp";

export function getComptrollerHourDataId(blockTimestamp: BigInt): string {
  return DefaultComptrollerId.concat("-").concat(getHourStartTimestamp(blockTimestamp).toString());
}
