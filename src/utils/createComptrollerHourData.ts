import { BigInt } from "@graphprotocol/graph-ts";
import { DefaultComptrollerId, ZeroBD, ZeroBI } from "../constants";
import { ComptrollerHourData } from "../types/schema";
import { getComptrollerHourDataId } from "./getComptrollerHourDataId";
import { getHourStartTimestamp } from "./getHourStartTimestamp";

export function createComptrollerHourData(blockTimestamp: BigInt): ComptrollerHourData {
  const comptrollerHourDataId = getComptrollerHourDataId(blockTimestamp);
  const comptrollerHourData = new ComptrollerHourData(comptrollerHourDataId);
  comptrollerHourData.comptroller = DefaultComptrollerId;
  comptrollerHourData.timestamp = getHourStartTimestamp(blockTimestamp);
  comptrollerHourData.transactionsCount = ZeroBI;
  comptrollerHourData.totalSupplyUSD = ZeroBD;
  comptrollerHourData.totalBorrowUSD = ZeroBD;
  comptrollerHourData.totalReservesUSD = ZeroBD;
  comptrollerHourData.utilization = ZeroBD;
  comptrollerHourData.save();
  return comptrollerHourData;
}
