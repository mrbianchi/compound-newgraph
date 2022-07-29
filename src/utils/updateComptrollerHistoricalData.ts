import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import { OneBD } from "../constants";
import { getComptroller } from "./getComptroller";
import { getComptrollerHourData } from "./getComptrollerHourData";

export function updateComptrollerHistoricalData(event: ethereum.Event): void {
  const comptroller = getComptroller();
  const comptrollerHourData = getComptrollerHourData(event.block.timestamp);
  const transactionsCount = comptrollerHourData.transactionsCount.toBigDecimal();
  const oldValueWeight = transactionsCount.div(transactionsCount.plus(OneBD));
  const newValueWeigth = OneBD.div(transactionsCount.plus(OneBD));

  comptrollerHourData.transactionsCount = comptrollerHourData.transactionsCount.plus(BigInt.fromU32(1));

  comptrollerHourData.totalSupplyUSD = comptrollerHourData.totalSupplyUSD
    .times(oldValueWeight)
    .plus(comptroller.totalSupplyUSD.times(newValueWeigth));

  comptrollerHourData.totalBorrowUSD = comptrollerHourData.totalBorrowUSD
    .times(oldValueWeight)
    .plus(comptroller.totalBorrowUSD.times(newValueWeigth));

  comptrollerHourData.totalReservesUSD = comptrollerHourData.totalReservesUSD
    .times(oldValueWeight)
    .plus(comptroller.totalReservesUSD.times(newValueWeigth));

  comptrollerHourData.utilization = comptrollerHourData.utilization.times(oldValueWeight);

  comptrollerHourData.save();
}
