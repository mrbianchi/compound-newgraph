import { Address, BigDecimal, ethereum } from "@graphprotocol/graph-ts";
import {
  BlocksPerDay,
  CTokenDecimals,
  CompAddress,
  CompDecimals,
  DayPerYear,
  MantissaFactor,
  NativeTokenDecimals,
  OneBD,
  OneBI,
  OneHundredBD,
  ZeroBD,
  ZeroBI,
  cNativeAddress,
} from "../constants";
import { Market } from "../types/schema";
import { CToken } from "../types/templates/CToken/CToken";
import { amountToDecimal } from "./amountToDecimal";
import { getTokenPrice } from "./getTokenPrice";

// From 'Calculating the APY Using Rate Per Block' (https://compound.finance/docs#protocol-math)
function calculateAPY(ratePerBlock: BigDecimal): BigDecimal {
  const base = OneBD.plus(ratePerBlock.times(BlocksPerDay));
  let result = OneBD;

  for (let i = ZeroBI; i.lt(DayPerYear); i = i.plus(OneBI)) {
    result = result.times(base);
  }

  return result.minus(OneBD).times(OneHundredBD);
}

// From https://gist.github.com/ajb413/d32442edae9251ad395436d5b80d4480
function calculateCompSupplyDistrubtionAPY(
  totalSupplyUSD: BigDecimal,
  exchangeRate: BigDecimal,
  compSpeedSupplyPerBlock: BigDecimal
): BigDecimal {
  if (totalSupplyUSD.equals(ZeroBD)) {
    return ZeroBD;
  }

  const compPriceUSD = getTokenPrice(Address.fromString(CompAddress), CompDecimals);
  const compSpeedSupplyPerDay = compSpeedSupplyPerBlock.times(BlocksPerDay);

  const base = OneBD.plus(compPriceUSD.times(compSpeedSupplyPerDay).div(totalSupplyUSD.times(exchangeRate)));
  let result = OneBD;

  for (let i = ZeroBI; i.lt(DayPerYear); i = i.plus(OneBI)) {
    result = result.times(base);
  }

  return result.minus(OneBD).times(OneHundredBD);
}

function calculateCompBorrowDistrubtionAPY(totalBorrowUSD: BigDecimal, compSpeedBorroPerBlock: BigDecimal): BigDecimal {
  if (totalBorrowUSD.equals(ZeroBD)) {
    return ZeroBD;
  }

  const compPriceUSD = getTokenPrice(Address.fromString(CompAddress), CompDecimals);
  const compSpeedBorrowPerDay = compSpeedBorroPerBlock.times(BlocksPerDay);

  const base = OneBD.plus(compPriceUSD.times(compSpeedBorrowPerDay).div(totalBorrowUSD));
  let result = OneBD;

  for (let i = ZeroBI; i.lt(DayPerYear); i = i.plus(OneBI)) {
    result = result.times(base);
  }

  return result.minus(OneBD).times(OneHundredBD);
}

function updateCommonMarket(market: Market, event: ethereum.Event): void {
  const contractAddress = Address.fromString(market.id);
  const contract = CToken.bind(contractAddress);

  market.latestBlockNumber = event.block.number;
  market.latestBlockTimestamp = event.block.timestamp;

  market.exchangeRate = amountToDecimal(
    contract.exchangeRateStored(),
    MantissaFactor + market.underlyingDecimals - CTokenDecimals
  );

  //market.numberOfSuppliers = ZeroBI;
  market.totalSupply = amountToDecimal(contract.totalSupply(), CTokenDecimals).times(market.exchangeRate);
  market.totalSupplyUSD = market.totalSupply.times(market.underlyingPriceUSD);
  market.supplyRatePerBlock = amountToDecimal(contract.supplyRatePerBlock(), MantissaFactor);
  market.supplyAPY = calculateAPY(market.supplyRatePerBlock);
  //market.compSpeedSupply = amountToDecimal(tryCompSpeedSupply.value, MantissaFactor); // CompSupplySpeedUpdated evet
  const compSupplyAPY = calculateCompSupplyDistrubtionAPY(
    market.totalSupplyUSD,
    market.exchangeRate,
    market.compSpeedSupplyPerBlock
  );
  market.totalSupplyAPY = market.supplyAPY.plus(compSupplyAPY);
  //market.numberOfBorrowers = ZeroBI;
  market.totalBorrow = amountToDecimal(contract.totalBorrows(), market.underlyingDecimals);
  market.totalBorrowUSD = market.totalBorrow.times(market.underlyingPriceUSD);
  market.borrowRatePerBlock = amountToDecimal(contract.borrowRatePerBlock(), MantissaFactor);
  market.borrowAPY = calculateAPY(market.borrowRatePerBlock);
  market.borrowIndex = amountToDecimal(contract.borrowIndex(), MantissaFactor);
  //market.borrowCap = amountToDecimal(tryBorrowCaps.value, BigInt.fromU32(18)); // NewBorrowCap event
  //market.compSpeedBorrow = amountToDecimal(tryCompSpeedBorrow.value, MantissaFactor); // CompBorrowSpeedUpdated event
  const compBorrowAPY = calculateCompBorrowDistrubtionAPY(market.totalBorrowUSD, market.compSpeedBorrowPerBlock);
  market.totalBorrowAPY = market.borrowAPY.minus(compBorrowAPY);
  market.reserveFactorPercent = amountToDecimal(contract.reserveFactorMantissa(), MantissaFactor).times(OneHundredBD);
  market.totalReserves = amountToDecimal(contract.totalReserves(), market.underlyingDecimals);
  market.totalReservesUSD = market.totalReserves.times(market.underlyingPriceUSD);
  market.cash = amountToDecimal(contract.getCash(), market.underlyingDecimals);

  let availableLiquidity = market.totalSupply.times(market.collateralFactorPercent.div(OneHundredBD)).minus(market.totalBorrow);

  // Clamp to min of 0
  if (availableLiquidity.lt(ZeroBD)) {
    availableLiquidity = ZeroBD;
  }

  // If there is a borrow cap, inforce it
  if (market.borrowCap.notEqual(ZeroBD)) {
    const capLeft = market.totalBorrow.gt(market.borrowCap) ? ZeroBD : market.borrowCap.minus(market.totalBorrow);
    if (availableLiquidity.gt(capLeft)) {
      availableLiquidity = capLeft;
    }
  }

  market.availableLiquidity = availableLiquidity;
  market.availableLiquidityUSD = market.availableLiquidity.times(market.underlyingPriceUSD);

  market.utilization = ZeroBD;
  if (market.totalSupply.notEqual(ZeroBD)) {
    market.utilization = market.totalBorrow.div(market.totalSupply);
  }
}

function updateNativeMarket(market: Market): void {
  const contractAddress = Address.fromString(market.id);
  const tokenPriceUSD = getTokenPrice(contractAddress, market.underlyingDecimals);
  market.underlyingPriceUSD = tokenPriceUSD;
}

function updateERC20Market(market: Market): void {
  const contractAddress = Address.fromString(market.id);
  const nativeTokenAddress = Address.fromString(cNativeAddress);
  const tokenPriceUSD = getTokenPrice(contractAddress, market.underlyingDecimals);
  const nativeTokenPriceUSD = getTokenPrice(nativeTokenAddress, NativeTokenDecimals);

  market.underlyingPriceNative = ZeroBD;
  if (nativeTokenPriceUSD.notEqual(ZeroBD)) {
    market.underlyingPriceNative = tokenPriceUSD.div(nativeTokenPriceUSD);
  }
  market.underlyingPriceUSD = tokenPriceUSD;
}

export function updateMarket(market: Market, event: ethereum.Event): void {
  // Only updateMarket if it has not been updated this block
  if (market.latestBlockNumber == event.block.number) {
    return;
  }

  if (market.id == cNativeAddress) {
    // It is ctoken of native token, we only update USD price
    updateNativeMarket(market);
  } else {
    updateERC20Market(market);
  }

  updateCommonMarket(market, event);
}
