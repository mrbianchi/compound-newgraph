import { BigInt } from "@graphprotocol/graph-ts";
import { ZeroBD, ZeroBI } from "../constants";
import { MarketHourData } from "../types/schema";
import { getHourStartTimestamp } from "./getHourStartTimestamp";
import { getMarketHourDataId } from "./getMarketHourDataId";

export function createMarketHourData(marketId: string, blockTimestamp: BigInt): MarketHourData {
  const marketHourDataId = getMarketHourDataId(marketId, blockTimestamp);
  const marketHourData = new MarketHourData(marketHourDataId);
  marketHourData.market = marketId;
  marketHourData.timestamp = getHourStartTimestamp(blockTimestamp);
  marketHourData.transactionsCount = ZeroBI;
  marketHourData.collateralFactorPercent = ZeroBD;
  marketHourData.underlyingPriceNative = ZeroBD;
  marketHourData.underlyingPriceUSD = ZeroBD;
  marketHourData.numberOfSuppliers = ZeroBD;
  marketHourData.totalSupply = ZeroBD;
  marketHourData.totalSupplyUSD = ZeroBD;
  marketHourData.supplyAPY = ZeroBD;
  marketHourData.supplyRatePerBlock = ZeroBD;
  marketHourData.totalSupplyAPY = ZeroBD;
  marketHourData.compSpeedSupplyPerBlock = ZeroBD;
  marketHourData.numberOfBorrowers = ZeroBD;
  marketHourData.totalBorrow = ZeroBD;
  marketHourData.totalBorrowUSD = ZeroBD;
  marketHourData.borrowAPY = ZeroBD;
  marketHourData.borrowRatePerBlock = ZeroBD;
  marketHourData.totalBorrowAPY = ZeroBD;
  marketHourData.borrowIndex = ZeroBD;
  marketHourData.borrowCap = ZeroBD;
  marketHourData.compSpeedBorrowPerBlock = ZeroBD;
  marketHourData.reserveFactorPercent = ZeroBD;
  marketHourData.totalReserves = ZeroBD;
  marketHourData.totalReservesUSD = ZeroBD;
  marketHourData.cash = ZeroBD;
  marketHourData.availableLiquidity = ZeroBD;
  marketHourData.availableLiquidityUSD = ZeroBD;
  marketHourData.utilization = ZeroBD;
  marketHourData.exchangeRate = ZeroBD;
  return marketHourData;
}
