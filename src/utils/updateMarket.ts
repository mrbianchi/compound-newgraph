import { Address, BigDecimal, ethereum, log } from "@graphprotocol/graph-ts";
import { CTokenDecimalsBD, MantissaFactor, MantissaFactorBD, NativeTokenDecimals, ZeroBD, cNativeAddress } from "../constants";
import { Market } from "../types/schema";
import { CToken } from "../types/templates/CToken/CToken";
import { exponentToBigDecimal } from "./exponentToBigDecimal";
import { getTokenPrice } from "./getTokenPrice";

function updateCommonMarket(market: Market, block: ethereum.Block): void {
  const contractAddress = Address.fromString(market.id);
  const contract = CToken.bind(contractAddress);
  market.accrualBlockNumber = contract.accrualBlockNumber();
  market.blockTimestamp = block.timestamp;
  market.totalSupply = contract.totalSupply().toBigDecimal().div(CTokenDecimalsBD);

  /* Exchange rate explanation
       In Practice
        - If you call the cDAI contract on etherscan it comes back (2.0 * 10^26)
        - If you call the cUSDC contract on etherscan it comes back (2.0 * 10^14)
        - The real value is ~0.02. So cDAI is off by 10^28, and cUSDC 10^16
       How to calculate for tokens with different decimals
        - Must div by tokenDecimals, 10^market.underlyingDecimals
        - Must multiply by ctokenDecimals, 10^8
        - Must div by mantissa, 10^18
     */
  market.exchangeRate = contract
    .exchangeRateStored()
    .toBigDecimal()
    .div(exponentToBigDecimal(market.underlyingDecimals))
    .times(CTokenDecimalsBD)
    .div(MantissaFactorBD)
    .truncate(MantissaFactor);
  market.borrowIndex = contract.borrowIndex().toBigDecimal().div(MantissaFactorBD).truncate(MantissaFactor);

  market.reserves = contract
    .totalReserves()
    .toBigDecimal()
    .div(exponentToBigDecimal(market.underlyingDecimals))
    .truncate(market.underlyingDecimals);
  market.totalBorrows = contract
    .totalBorrows()
    .toBigDecimal()
    .div(exponentToBigDecimal(market.underlyingDecimals))
    .truncate(market.underlyingDecimals);
  market.cash = contract
    .getCash()
    .toBigDecimal()
    .div(exponentToBigDecimal(market.underlyingDecimals))
    .truncate(market.underlyingDecimals);

  // Must convert to BigDecimal, and remove 10^18 that is used for Exp in Compound Solidity
  market.borrowRate = contract
    .borrowRatePerBlock()
    .toBigDecimal()
    .times(BigDecimal.fromString("2102400"))
    .div(MantissaFactorBD)
    .truncate(MantissaFactor);

  market.supplyRate = contract
    .supplyRatePerBlock()
    .toBigDecimal()
    .times(BigDecimal.fromString("2102400"))
    .div(MantissaFactorBD)
    .truncate(MantissaFactor);
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

export function updateMarket(market: Market, block: ethereum.Block): Market {
  // Only updateMarket if it has not been updated this block
  if (market.accrualBlockNumber == block.number) {
    return market;
  }

  updateCommonMarket(market, block);

  if (market.id == cNativeAddress) {
    // It is ctoken of native token, we only update USD price
    updateNativeMarket(market);
  } else {
    updateERC20Market(market);
  }

  market.save();

  return market;
}
