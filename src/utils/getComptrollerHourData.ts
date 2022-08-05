import { BigInt } from "@graphprotocol/graph-ts";
import { ComptrollerHourData } from "../types/schema";
import { createComptrollerHourData } from "./createComptrollerHourData";
import { getComptrollerHourDataId } from "./getComptrollerHourDataId";

export function getComptrollerHourData(blockTimestamp: BigInt): ComptrollerHourData {
  const comptrollerHourDataId = getComptrollerHourDataId(blockTimestamp);
  let comptrollerHourData = ComptrollerHourData.load(comptrollerHourDataId);

  if (!comptrollerHourData) {
    comptrollerHourData = createComptrollerHourData(blockTimestamp);
  }

  return comptrollerHourData;
}
