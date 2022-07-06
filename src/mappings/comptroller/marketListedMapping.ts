import { Address, BigDecimal, BigInt, log, dataSource } from "@graphprotocol/graph-ts";
import { MarketListed } from "../../types/Comptroller/Comptroller";
import { Market } from "../../types/schema";
import { CToken } from "../../types/templates";
import { CToken as CTokenTemplate } from "../../types/templates/CToken/CToken";
import { ERC20 } from '../../types/Comptroller/ERC20';

let network = dataSource.network();

let cETHAddress: string =
  network == 'mainnet'
    ? '0x41B5844f4680a8C38fBb695b7F9CFd1F64474a72' // mainnet
    : '0xae2f3405d7ecff01346884c21cfa840a674ea05d' // kovan

let zeroBD = BigDecimal.fromString('0');

export function handleMarketListed(event: MarketListed): void {
  log.warning("MarketListed event handled", []);
  log.warning("param cToken: {}", [event.params.cToken.toHexString()]);
  /*if (invalid_markets.indexOf(event.params.cToken.toHexString()) !== -1) {
    return
  }*/
  // Dynamically index all new listed tokens
  CToken.create(event.params.cToken)
  // Create the market for this token, since it's now been listed.
  let market = createMarket(event.params.cToken.toHexString())
  market.save()
}
function createMarket(marketAddress: string) : Market {
  let market: Market = new Market(marketAddress)
  let contract = CTokenTemplate.bind(Address.fromString(marketAddress))


    // It is CETH, which has a slightly different interface
  if (marketAddress == cETHAddress) {
    market = new Market(marketAddress)
    market.underlyingAddress = Address.fromString(
      '0x0000000000000000000000000000000000000000',
    )
    market.underlyingDecimals = 18
    market.underlyingPrice = BigDecimal.fromString('1')
    market.underlyingPriceUSD = zeroBD

    if (network == 'mainnet') {
      market.underlyingName = 'Ether'
      market.underlyingSymbol = 'ETH'
    } else {
      market.underlyingName = 'Ether'
      market.underlyingSymbol = 'ETH'
    }
    // It is all other CERC20 contracts
  } else {
    market = new Market(marketAddress)
    market.underlyingAddress = contract.underlying()
    log.warning("underlyingAddress: {}", [market.underlyingAddress.toHexString()])
    let underlyingContract = ERC20.bind(Address.fromBytes(market.underlyingAddress));
    log.warning("underlyingAddress ERC20: {}", [underlyingContract._address.toHexString()])
    market.underlyingDecimals = underlyingContract.decimals()
    market.underlyingName = underlyingContract.name()
    market.underlyingSymbol = underlyingContract.symbol()
    market.underlyingPriceUSD = zeroBD
    market.underlyingPrice = zeroBD
    /*if (marketAddress == cUSDCAddress) {
      market.underlyingPriceUSD = BigDecimal.fromString('1')
    }*/
  }

  /*market.totalInterestAccumulatedExact = BigInt.fromI32(0)
  market.totalInterestAccumulated = zeroBD*/

  let interestRateModelAddress = contract.try_interestRateModel()
  let reserveFactor = contract.try_reserveFactorMantissa()

  market.borrowRate = zeroBD
  market.cash = zeroBD
  market.collateralFactor = zeroBD
  market.exchangeRate = zeroBD
  market.interestRateModelAddress = interestRateModelAddress.reverted
    ? Address.fromString('0x0000000000000000000000000000000000000000')
    : interestRateModelAddress.value
  market.name = contract.name()
  market.reserves = zeroBD
  market.supplyRate = zeroBD
  market.symbol = contract.symbol()
  market.totalBorrows = zeroBD
  market.totalSupply = zeroBD

  market.accrualBlockNumber = 0
  market.blockTimestamp = 0
  market.borrowIndex = zeroBD
  market.reserveFactor = reserveFactor.reverted ? BigInt.fromI32(0) : reserveFactor.value

  market.numberOfBorrowers = 0;
  market.numberOfSuppliers = 0;

  return market
}

