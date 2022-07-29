import { ethereum } from "@graphprotocol/graph-ts";
import { OneBD, OneBI } from "../constants";
import { getMarket } from "./getMarket";
import { getMarketHourData } from "./getMarketHourData";

export function updateMarketHistoricalData(event: ethereum.Event): void {
  const marketId = event.address.toHexString();
  const market = getMarket(marketId, event);
  const marketHourData = getMarketHourData(marketId, event.block.timestamp);
  const transactionsCount = marketHourData.transactionsCount.toBigDecimal();
  const oldValueWeight = transactionsCount.div(transactionsCount.plus(OneBD));
  const newValueWeigth = OneBD.div(transactionsCount.plus(OneBD));

  marketHourData.transactionsCount = marketHourData.transactionsCount.plus(OneBI);

  marketHourData.collateralFactor = marketHourData.collateralFactor
    .times(oldValueWeight)
    .plus(market.collateralFactor.times(newValueWeigth));

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

  marketHourData.compSpeedSupply = marketHourData.compSpeedSupply
    .times(oldValueWeight)
    .plus(market.compSpeedSupply.times(newValueWeigth));

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

  marketHourData.compSpeedBorrow = marketHourData.compSpeedBorrow
    .times(oldValueWeight)
    .plus(market.compSpeedBorrow.times(newValueWeigth));

  marketHourData.reserveFactor = marketHourData.reserveFactor
    .times(oldValueWeight)
    .plus(market.reserveFactor.times(newValueWeigth));

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
