import { ethereum } from "@graphprotocol/graph-ts";
import { ZeroBD } from "../constants";
import { getComptroller } from "./getComptroller";
import { getMarket } from "./getMarket";

export function updateComptrollerlSummaryData(event: ethereum.Event): void {
  const comptroller = getComptroller();

  if (!comptroller.markets) {
    return;
  }

  const marketsIds = comptroller.markets;

  let utilization = ZeroBD;
  let totalSupplyUSD = ZeroBD;
  let totalBorrowUSD = ZeroBD;
  let totalReservesUSD = ZeroBD;

  for (let i = 0; i < marketsIds.length; i++) {
    const marketId = marketsIds[i];
    const market = getMarket(marketId, event);
    totalSupplyUSD = totalSupplyUSD.plus(market.totalSupplyUSD);
    totalBorrowUSD = totalBorrowUSD.plus(market.totalBorrowUSD);
    totalReservesUSD = totalReservesUSD.plus(market.totalReservesUSD);
  }

  if (totalSupplyUSD.notEqual(ZeroBD)) {
    utilization = totalBorrowUSD.div(totalSupplyUSD);
  }

  comptroller.latestBlockNumber = event.block.number;
  comptroller.latestBlockTimestamp = event.block.timestamp;
  comptroller.totalSupplyUSD = totalSupplyUSD;
  comptroller.totalBorrowUSD = totalBorrowUSD;
  comptroller.totalReservesUSD = totalReservesUSD;
  comptroller.utilization = utilization;
  comptroller.save();
}
