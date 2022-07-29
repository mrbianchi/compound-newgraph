import { Address, BigDecimal, ethereum } from "@graphprotocol/graph-ts";
import {
  DefaultComptrollerId,
  MantissaFactor,
  NativeTokenDecimals,
  NativeTokenName,
  NativeTokenSymbol,
  NullAddress,
  ZeroBD,
  ZeroBI,
  cNativeAddress,
} from "../constants";
import { ERC20 } from "../types/Comptroller/ERC20";
import { cERC20Delegator } from "../types/Comptroller/cERC20Delegator";
import { cEther } from "../types/Comptroller/cEther";
import { Market } from "../types/schema";
import { CToken } from "../types/templates";
import { amountToDecimal } from "./amountToDecimal";

function fillCommonMarket(market: Market, event: ethereum.Event): void {
  market.comptroller = DefaultComptrollerId;
  market.creationBlockNumber = event.block.number;
  market.creationBlockTimestamp = event.block.timestamp;
  market.latestBlockNumber = event.block.number;
  market.latestBlockTimestamp = event.block.timestamp;
  market.mintsPaused = false;
  market.borrowsPaused = false;
  market.interestRateModelAddress = NullAddress;
  //market.symbol = "";
  //market.name = "";
  market.collateralFactor = ZeroBD;
  //market.underlyingSymbol = "";
  //market.underlyingName = "";
  market.underlyingAddress = NullAddress;
  market.underlyingDecimals = 0;
  market.underlyingPriceNative = ZeroBD;
  market.underlyingPriceUSD = ZeroBD;
  market.numberOfSuppliers = ZeroBI;
  market.totalSupply = ZeroBD;
  market.totalSupplyUSD = ZeroBD;
  market.supplyAPY = ZeroBD;
  market.supplyRatePerBlock = ZeroBD;
  market.totalSupplyAPY = ZeroBD;
  market.compSpeedSupply = ZeroBD;
  market.numberOfBorrowers = ZeroBI;
  market.totalBorrow = ZeroBD;
  market.totalBorrowUSD = ZeroBD;
  market.borrowAPY = ZeroBD;
  market.borrowRatePerBlock = ZeroBD;
  market.totalBorrowAPY = ZeroBD;
  market.borrowIndex = ZeroBD;
  market.borrowCap = ZeroBD;
  market.compSpeedBorrow = ZeroBD;
  market.reserveFactor = ZeroBD;
  market.totalReserves = ZeroBD;
  market.totalReservesUSD = ZeroBD;
  market.cash = ZeroBD;
  market.availableLiquidity = ZeroBD;
  market.availableLiquidityUSD = ZeroBD;
  market.utilization = ZeroBD;
  market.exchangeRate = ZeroBD;
}

function fillNativeMarket(market: Market): void {
  const contract = cEther.bind(Address.fromString(market.id));

  market.name = contract.name();
  market.symbol = contract.symbol();
  market.underlyingName = NativeTokenName;
  market.underlyingSymbol = NativeTokenSymbol;

  market.interestRateModelAddress = contract.interestRateModel();
  market.reserveFactor = amountToDecimal(contract.reserveFactorMantissa(), MantissaFactor);
  market.underlyingDecimals = NativeTokenDecimals;
  market.underlyingPriceNative = BigDecimal.fromString("1");
}

function fillERC20Market(market: Market): void {
  const marketAddress = Address.fromString(market.id);
  const contract = cERC20Delegator.bind(marketAddress);
  const underlyingContract = ERC20.bind(contract.underlying());

  market.name = contract.name();
  market.symbol = contract.symbol();
  market.underlyingName = underlyingContract.name();
  market.underlyingSymbol = underlyingContract.symbol();

  market.underlyingAddress = contract.underlying();
  market.interestRateModelAddress = contract.interestRateModel();
  market.reserveFactor = amountToDecimal(contract.reserveFactorMantissa(), MantissaFactor);
  market.underlyingDecimals = underlyingContract.decimals();
}

export function createMarket(marketId: string, event: ethereum.Event): Market {
  const marketAddress = Address.fromString(marketId);
  const market = new Market(marketId);

  CToken.create(marketAddress);

  fillCommonMarket(market, event);

  if (marketId == cNativeAddress) {
    // It is ctoken of native token, which has a slightly different interface
    fillNativeMarket(market);
  } else {
    // It is all other CERC20 contracts
    fillERC20Market(market);
  }

  market.save();
  return market;
}
