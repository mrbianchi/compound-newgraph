import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { CTokenDecimals, MantissaFactor, NativeTokenDecimals, OneBD, ZeroBD, ZeroBI, cNativeAddress } from "../constants";
import { Market } from "../types/schema";
import { CToken } from "../types/templates/CToken/CToken";
import { amountToDecimal } from "./amountToDecimal";
import { getTokenPrice } from "./getTokenPrice";

export const SEC_PER_BLOCK = BigDecimal.fromString("13.5");
export const SEC_PER_DAY = BigInt.fromU32(86400);
export const BLOCK_PER_SEC = BigDecimal.fromString("1").div(SEC_PER_BLOCK);
export const BLOCKS_PER_DAY = BLOCK_PER_SEC.times(SEC_PER_DAY.toBigDecimal());
export const DAYS_PER_YEAR = BigInt.fromU32(365);

export function calculateAPY(ratePerBlock: BigDecimal): BigDecimal {
  const base = ratePerBlock.times(BLOCKS_PER_DAY).plus(OneBD);

  let apy = BigDecimal.fromString("1");
  for (let i = ZeroBI; i.lt(DAYS_PER_YEAR); i = i.plus(ZeroBI)) {
    apy = apy.times(base);
  }
  return apy.minus(OneBD);
}

function updateCommonMarket(market: Market, event: ethereum.Event): void {
  const contractAddress = Address.fromString(market.id);
  const contract = CToken.bind(contractAddress);

  market.latestBlockNumber = event.block.number; //contract.accrualBlockNumber();
  market.latestBlockTimestamp = event.block.timestamp;

  market.exchangeRate = amountToDecimal(
    contract.exchangeRateStored(),
    MantissaFactor + market.underlyingDecimals - CTokenDecimals
  );

  //market.numberOfSuppliers = ZeroBI;
  market.totalSupply = amountToDecimal(contract.totalSupply(), CTokenDecimals).times(market.exchangeRate);
  market.totalSupplyUSD = market.totalSupply.times(market.underlyingPriceUSD);
  market.supplyRatePerBlock = amountToDecimal(contract.supplyRatePerBlock(), MantissaFactor); //TODO .times(BigDecimal.fromString("2102400"))
  market.supplyAPY = calculateAPY(market.supplyRatePerBlock);
  //market.totalSupplyAPY = market.supplyAPY.plus(compSupplyAPY); //TODO
  //market.compSpeedSupply = ZeroBI;
  //market.numberOfBorrowers = ZeroBI;
  market.totalBorrow = amountToDecimal(contract.totalBorrows(), market.underlyingDecimals);
  market.totalBorrowUSD = market.totalBorrow.times(market.underlyingPriceUSD);
  market.borrowRatePerBlock = amountToDecimal(contract.borrowRatePerBlock(), MantissaFactor); //TODO .times(BigDecimal.fromString("2102400"))
  market.borrowAPY = calculateAPY(market.borrowRatePerBlock);
  //market.totalBorrowAPY = market.borrowAPY.minus(compBorrowAPY); //TODO
  market.borrowIndex = amountToDecimal(contract.borrowIndex(), MantissaFactor);
  //market.borrowCap = amountToDecimal(tryBorrowCaps.value, BigInt.fromU32(18));
  //market.compSpeedBorrow = amountToDecimal(tryCompSpeeds.value, BigInt.fromU32(18));
  market.reserveFactor = amountToDecimal(contract.reserveFactorMantissa(), MantissaFactor);
  market.totalReserves = amountToDecimal(contract.totalReserves(), market.underlyingDecimals);
  market.totalReservesUSD = market.totalReserves.times(market.underlyingPriceUSD);
  market.cash = amountToDecimal(contract.getCash(), market.underlyingDecimals);

  let availableLiquidity = market.totalSupply.times(market.collateralFactor).minus(market.totalBorrow);

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
  market.underlyingPriceUSD = tokenPriceUSD.truncate(market.underlyingDecimals);
}

function updateERC20Market(market: Market): void {
  const contractAddress = Address.fromString(market.id);
  const nativeTokenAddress = Address.fromString(cNativeAddress);
  const tokenPriceUSD = getTokenPrice(contractAddress, market.underlyingDecimals);
  const nativeTokenPriceUSD = getTokenPrice(nativeTokenAddress, NativeTokenDecimals);

  market.underlyingPriceNative = tokenPriceUSD.div(nativeTokenPriceUSD).truncate(market.underlyingDecimals);
  market.underlyingPriceUSD = tokenPriceUSD.truncate(market.underlyingDecimals);
}

export function updateMarket(market: Market, event: ethereum.Event): Market {
  // Only updateMarket if it has not been updated this block
  if (market.latestBlockNumber == event.block.number) {
    return market;
  }

  if (market.id == cNativeAddress) {
    // It is ctoken of native token, we only update USD price
    updateNativeMarket(market);
  } else {
    updateERC20Market(market);
  }

  updateCommonMarket(market, event);

  market.save();

  return market;
}
