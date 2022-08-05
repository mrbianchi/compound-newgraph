import { ethereum } from "@graphprotocol/graph-ts";
import { OneBD, OneBI } from "../constants";
import { Market } from "../types/schema";
import { getMarketHourData } from "./getMarketHourData";

export function updateMarketHistoricalData(market: Market, event: ethereum.Event): void {
  const marketHourData = getMarketHourData(market.id, event.block.timestamp);
  const transactionsCount = marketHourData.transactionsCount.toBigDecimal();
  const oldValueWeight = transactionsCount.div(transactionsCount.plus(OneBD));
  const newValueWeigth = OneBD.div(transactionsCount.plus(OneBD));

  marketHourData.transactionsCount = marketHourData.transactionsCount.plus(OneBI);

  marketHourData.collateralFactorPercent = marketHourData.collateralFactorPercent
    .times(oldValueWeight)
    .plus(market.collateralFactorPercent.times(newValueWeigth));

  marketHourData.underlyingPriceNative = marketHourData.underlyingPriceNative
    .times(oldValueWeight)
    .plus(market.underlyingPriceNative.times(newValueWeigth));

  marketHourData.underlyingPriceUSD = marketHourData.underlyingPriceUSD
    .times(oldValueWeight)
    .plus(market.underlyingPriceUSD.times(newValueWeigth));

  marketHourData.numberOfSuppliers = marketHourData.numberOfSuppliers
    .times(oldValueWeight)
    .plus(market.numberOfSuppliers.toBigDecimal().times(newValueWeigth));

  marketHourData.totalSupply = marketHourData.totalSupply.times(oldValueWeight).plus(market.totalSupply.times(newValueWeigth));

  marketHourData.totalSupplyUSD = marketHourData.totalSupplyUSD
    .times(oldValueWeight)
    .plus(market.totalSupplyUSD.times(newValueWeigth));

  marketHourData.supplyAPY = marketHourData.supplyAPY.times(oldValueWeight).plus(market.supplyAPY.times(newValueWeigth));

  marketHourData.supplyRatePerBlock = marketHourData.supplyRatePerBlock
    .times(oldValueWeight)
    .plus(market.supplyRatePerBlock.times(newValueWeigth));

  marketHourData.totalSupplyAPY = marketHourData.totalSupplyAPY
    .times(oldValueWeight)
    .plus(market.totalSupplyAPY.times(newValueWeigth));

  marketHourData.compSpeedSupplyPerBlock = marketHourData.compSpeedSupplyPerBlock
    .times(oldValueWeight)
    .plus(market.compSpeedSupplyPerBlock.times(newValueWeigth));

  marketHourData.numberOfBorrowers = marketHourData.numberOfBorrowers
    .times(oldValueWeight)
    .plus(market.numberOfBorrowers.toBigDecimal().times(newValueWeigth));

  marketHourData.totalBorrow = marketHourData.totalBorrow.times(oldValueWeight).plus(market.totalBorrow.times(newValueWeigth));

  marketHourData.totalBorrowUSD = marketHourData.totalBorrowUSD
    .times(oldValueWeight)
    .plus(market.totalBorrowUSD.times(newValueWeigth));

  marketHourData.borrowAPY = marketHourData.borrowAPY.times(oldValueWeight).plus(market.borrowAPY.times(newValueWeigth));

  marketHourData.borrowRatePerBlock = marketHourData.borrowRatePerBlock
    .times(oldValueWeight)
    .plus(market.borrowRatePerBlock.times(newValueWeigth));

  marketHourData.totalBorrowAPY = marketHourData.totalBorrowAPY
    .times(oldValueWeight)
    .plus(market.totalBorrowAPY.times(newValueWeigth));

  marketHourData.borrowIndex = marketHourData.borrowIndex.times(oldValueWeight).plus(market.borrowIndex.times(newValueWeigth));

  marketHourData.borrowCap = marketHourData.borrowCap.times(oldValueWeight).plus(market.borrowCap.times(newValueWeigth));

  marketHourData.compSpeedBorrowPerBlock = marketHourData.compSpeedBorrowPerBlock
    .times(oldValueWeight)
    .plus(market.compSpeedBorrowPerBlock.times(newValueWeigth));

  marketHourData.reserveFactorPercent = marketHourData.reserveFactorPercent
    .times(oldValueWeight)
    .plus(market.reserveFactorPercent.times(newValueWeigth));

  marketHourData.totalReserves = marketHourData.totalReserves
    .times(oldValueWeight)
    .plus(market.totalReserves.times(newValueWeigth));

  marketHourData.totalReservesUSD = marketHourData.totalReservesUSD
    .times(oldValueWeight)
    .plus(market.totalReservesUSD.times(newValueWeigth));

  marketHourData.cash = marketHourData.cash.times(oldValueWeight).plus(market.cash.times(newValueWeigth));

  marketHourData.availableLiquidity = marketHourData.availableLiquidity
    .times(oldValueWeight)
    .plus(market.availableLiquidity.times(newValueWeigth));

  marketHourData.availableLiquidityUSD = marketHourData.availableLiquidityUSD
    .times(oldValueWeight)
    .plus(market.availableLiquidityUSD.times(newValueWeigth));

  marketHourData.utilization = marketHourData.utilization.times(oldValueWeight).plus(market.utilization.times(newValueWeigth));

  marketHourData.exchangeRate = marketHourData.exchangeRate
    .times(oldValueWeight)
    .plus(market.exchangeRate.times(newValueWeigth));

  marketHourData.save();
}
