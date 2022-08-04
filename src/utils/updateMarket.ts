import { Address, ethereum } from "@graphprotocol/graph-ts";
import { BlocksPerYear, CTokenDecimals, MantissaFactor, NativeTokenDecimals, ZeroBD, cNativeAddress } from "../constants";
import { Market } from "../types/schema";
import { CToken } from "../types/templates/CToken/CToken";
import { amountToDecimal } from "./amountToDecimal";
import { getTokenPrice } from "./getTokenPrice";

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
  market.supplyRatePerBlock = amountToDecimal(contract.supplyRatePerBlock(), MantissaFactor); //TODO .times(BigDecimal.fromString("2102400"))
  market.supplyAPY = market.supplyRatePerBlock.times(BlocksPerYear);
  //market.totalSupplyAPY = market.supplyAPY.plus(compSupplyAPY); //TODO
  //market.compSpeedSupply = ZeroBI;
  //market.numberOfBorrowers = ZeroBI;
  market.totalBorrow = amountToDecimal(contract.totalBorrows(), market.underlyingDecimals);
  market.totalBorrowUSD = market.totalBorrow.times(market.underlyingPriceUSD);
  market.borrowRatePerBlock = amountToDecimal(contract.borrowRatePerBlock(), MantissaFactor); //TODO .times(BigDecimal.fromString("2102400"))
  market.borrowAPY = market.borrowRatePerBlock.times(BlocksPerYear);
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
