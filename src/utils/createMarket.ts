import { Address, BigDecimal } from "@graphprotocol/graph-ts";
import { NullAddress, ZeroBD, ZeroBI, cEtherAddress } from "../constants";
import { ERC20 } from "../types/Comptroller/ERC20";
import { cERC20Delegator } from "../types/Comptroller/cERC20Delegator";
import { cEther } from "../types/Comptroller/cEther";
import { Market } from "../types/schema";
import { CToken } from "../types/templates";

function fillCommonMarket(market: Market): void {
  market.borrowRate = ZeroBD;
  market.cash = ZeroBD;
  market.collateralFactor = ZeroBD;
  market.exchangeRate = ZeroBD;
  market.interestRateModelAddress = NullAddress;
  market.numberOfBorrowers = ZeroBI;
  market.numberOfSuppliers = ZeroBI;
  market.reserves = ZeroBD;
  market.supplyRate = ZeroBD;
  market.totalBorrows = ZeroBD;
  market.totalSupply = ZeroBD;
  market.underlyingPrice = ZeroBD;
  market.accrualBlockNumber = ZeroBI;
  market.blockTimestamp = ZeroBI;
  market.borrowIndex = ZeroBD;
  market.reserveFactor = ZeroBI;
  market.underlyingPriceUSD = ZeroBD;
  market.underlyingAddress = NullAddress;
  market.underlyingDecimals = 0;
}

function fillEtherMarket(market: Market): void {
  const contract = cEther.bind(Address.fromString(market.id));

  market.name = contract.name();
  market.symbol = contract.symbol();
  market.underlyingName = "Ether";
  market.underlyingSymbol = "ETH";

  market.interestRateModelAddress = contract.interestRateModel();
  market.reserveFactor = contract.reserveFactorMantissa();
  market.underlyingDecimals = 18;
  market.underlyingPrice = BigDecimal.fromString("1");
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
  market.reserveFactor = contract.reserveFactorMantissa();
  market.underlyingDecimals = underlyingContract.decimals();

  ///if (market.underlyingAddress.toHexString() == daiAddress) {
  //  market.underlyingName = "Dai Stablecoin v1.0 (DAI)";
  //  market.underlyingSymbol = "DAI";
  //}
  //if (marketAddress == cUSDCAddress) {
  //  market.underlyingPriceUSD = BigDecimal.fromString("1");
  //}
}

export function createMarket(marketId: string): Market {
  const marketAddress = Address.fromString(marketId);
  const market = new Market(marketId);

  CToken.create(marketAddress);

  fillCommonMarket(market);

  if (marketId == cEtherAddress) {
    // It is CETH, which has a slightly different interface
    fillEtherMarket(market);
  } else {
    // It is all other CERC20 contracts
    fillERC20Market(market);
  }

  market.save();
  return market;
}
