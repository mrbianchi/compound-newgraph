import { BigInt } from "@graphprotocol/graph-ts";
import { ZeroBD, ZeroBI } from "../constants";
import { ComptrollerHourData } from "../types/schema";
import { getComptrollerHourDataId } from "./getComptrollerHourDataId";
import { getHourStartTimestamp } from "./getHourStartTimestamp";

export function createComptrollerHourData(blockTimestamp: BigInt): ComptrollerHourData {
  const comptrollerHourDataId = getComptrollerHourDataId(blockTimestamp);
  const domptrollerHourData = new ComptrollerHourData(comptrollerHourDataId);
  domptrollerHourData.timestamp = getHourStartTimestamp(blockTimestamp);
  domptrollerHourData.transactionsCount = ZeroBI;
  domptrollerHourData.totalSupplyUSD = ZeroBD;
  domptrollerHourData.totalBorrowUSD = ZeroBD;
  domptrollerHourData.totalReservesUSD = ZeroBD;
  domptrollerHourData.utilization = ZeroBD;
  domptrollerHourData.save();
  return domptrollerHourData;
}
