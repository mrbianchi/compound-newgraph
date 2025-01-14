import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { ZeroBD } from "../../src/constants";
import { Market } from "../../src/types/schema";

export abstract class MarketDefaultValues {
  public static readonly Id: string = "0xfafafa0000000000000000000000000000000001";
  public static readonly Name: string = "Builder Market";
  public static readonly Symbol: string = "bMarket";
  public static readonly UnderlyingName: string = "Market";
  public static readonly UnderlyingSymbol: string = "Market";
  public static readonly MintsPaused: boolean = false;
  public static readonly BorrowsPaused: boolean = false;
  public static readonly BorrowAPY: BigDecimal = ZeroBD;
  public static readonly BorrowRatePerBlock: BigDecimal = ZeroBD;
  public static readonly Cash: BigDecimal = ZeroBD;
  public static readonly CollateralFactorPercent: BigDecimal = ZeroBD;
  public static readonly ExchangeRate: BigDecimal = ZeroBD;
  public static readonly InterestRateModelAddress: string = "0xfafafa0000000000000000000000000000000002";
  public static readonly NumberOfBorrowers: u64 = 0;
  public static readonly NumberOfSuppliers: u64 = 0;
  public static readonly TotalReserves: BigDecimal = ZeroBD;
  public static readonly SupplyRatePerBlock: BigDecimal = ZeroBD;
  public static readonly TotalBorrow: BigDecimal = ZeroBD;
  public static readonly TotalSupply: BigDecimal = ZeroBD;
  public static readonly UnderlyingPriceNative: BigDecimal = ZeroBD;
  public static readonly CreationBlockNumber: u64 = 0;
  public static readonly CreationBlockTimestamp: u64 = 0;
  public static readonly LatestBlockNumber: u64 = 0;
  public static readonly LatestBlockTimestamp: u64 = 0;
  public static readonly BorrowIndex: BigDecimal = ZeroBD;
  public static readonly ReserveFactorPercent: BigDecimal = ZeroBD;
  public static readonly UnderlyingPriceUSD: BigDecimal = ZeroBD;
  public static readonly UnderlyingAddress: string = "0xfafafa0000000000000000000000000000000003";
  public static readonly UnderlyingDecimals: i32 = 18;
  public static readonly CompSpeedBorrowPerBlock: BigDecimal = ZeroBD;
  public static readonly CompSpeedSupplyPerBlock: BigDecimal = ZeroBD;
  public static readonly BorrowCap: BigDecimal = ZeroBD;
  public static readonly TotalSupplyUSD: BigDecimal = ZeroBD;
  public static readonly SupplyAPY: BigDecimal = ZeroBD;
  public static readonly TotalSupplyAPY: BigDecimal = ZeroBD;
  public static readonly TotalBorrowUSD: BigDecimal = ZeroBD;
  public static readonly TotalBorrowAPY: BigDecimal = ZeroBD;
  public static readonly TotalReservesUSD: BigDecimal = ZeroBD;
  public static readonly AvailableLiquidity: BigDecimal = ZeroBD;
  public static readonly AvailableLiquidityUSD: BigDecimal = ZeroBD;
  public static readonly Utilization: BigDecimal = ZeroBD;
}

export class MarketBuilder {
  private id: string = MarketDefaultValues.Id;
  private name: string = MarketDefaultValues.Name;
  private symbol: string = MarketDefaultValues.Symbol;
  private underlyingName: string = MarketDefaultValues.UnderlyingName;
  private underlyingSymbol: string = MarketDefaultValues.UnderlyingSymbol;
  private mintsPaused: boolean = MarketDefaultValues.MintsPaused;
  private borrowsPaused: boolean = MarketDefaultValues.BorrowsPaused;
  private borrowAPY: BigDecimal = MarketDefaultValues.BorrowAPY;
  private borrowRatePerBlock: BigDecimal = MarketDefaultValues.BorrowRatePerBlock;
  private cash: BigDecimal = MarketDefaultValues.Cash;
  private collateralFactorPercent: BigDecimal = MarketDefaultValues.CollateralFactorPercent;
  private exchangeRate: BigDecimal = MarketDefaultValues.ExchangeRate;
  private interestRateModelAddress: string = MarketDefaultValues.InterestRateModelAddress;
  private numberOfBorrowers: u64 = MarketDefaultValues.NumberOfBorrowers;
  private numberOfSuppliers: u64 = MarketDefaultValues.NumberOfSuppliers;
  private totalReserves: BigDecimal = MarketDefaultValues.TotalReserves;
  private supplyRatePerBlock: BigDecimal = MarketDefaultValues.SupplyRatePerBlock;
  private totalBorrow: BigDecimal = MarketDefaultValues.TotalBorrow;
  private totalSupply: BigDecimal = MarketDefaultValues.TotalSupply;
  private underlyingPriceNative: BigDecimal = MarketDefaultValues.UnderlyingPriceNative;
  private creationBlockNumber: u64 = MarketDefaultValues.CreationBlockNumber;
  private creationBlockTimestamp: u64 = MarketDefaultValues.CreationBlockTimestamp;
  private latestBlockNumber: u64 = MarketDefaultValues.LatestBlockNumber;
  private latestBlockTimestamp: u64 = MarketDefaultValues.LatestBlockTimestamp;
  private borrowIndex: BigDecimal = MarketDefaultValues.BorrowIndex;
  private reserveFactorPercent: BigDecimal = MarketDefaultValues.ReserveFactorPercent;
  private underlyingPriceUSD: BigDecimal = MarketDefaultValues.UnderlyingPriceUSD;
  private underlyingAddress: string = MarketDefaultValues.UnderlyingAddress;
  private underlyingDecimals: i32 = MarketDefaultValues.UnderlyingDecimals;
  private compSpeedBorrowPerBlock: BigDecimal = MarketDefaultValues.CompSpeedBorrowPerBlock;
  private compSpeedSupplyPerBlock: BigDecimal = MarketDefaultValues.CompSpeedSupplyPerBlock;
  private borrowCap: BigDecimal = MarketDefaultValues.BorrowCap;
  private totalSupplyUSD: BigDecimal = MarketDefaultValues.TotalSupplyUSD;
  private supplyAPY: BigDecimal = MarketDefaultValues.SupplyAPY;
  private totalSupplyAPY: BigDecimal = MarketDefaultValues.TotalSupplyAPY;
  private totalBorrowUSD: BigDecimal = MarketDefaultValues.TotalBorrowUSD;
  private totalBorrowAPY: BigDecimal = MarketDefaultValues.TotalBorrowAPY;
  private totalReservesUSD: BigDecimal = MarketDefaultValues.TotalReservesUSD;
  private availableLiquidity: BigDecimal = MarketDefaultValues.AvailableLiquidity;
  private availableLiquidityUSD: BigDecimal = MarketDefaultValues.AvailableLiquidityUSD;
  private utilization: BigDecimal = MarketDefaultValues.Utilization;

  build(): Market {
    const entity = new Market(this.id);
    entity.name = this.name;
    entity.symbol = this.symbol;
    entity.underlyingName = this.underlyingName;
    entity.underlyingSymbol = this.underlyingSymbol;
    entity.mintsPaused = this.mintsPaused;
    entity.borrowsPaused = this.borrowsPaused;
    entity.borrowAPY = this.borrowAPY;
    entity.borrowRatePerBlock = this.borrowRatePerBlock;
    entity.cash = this.cash;
    entity.collateralFactorPercent = this.collateralFactorPercent;
    entity.exchangeRate = this.exchangeRate;
    entity.interestRateModelAddress = Address.fromString(this.interestRateModelAddress);
    entity.numberOfBorrowers = BigInt.fromU64(this.numberOfBorrowers);
    entity.numberOfSuppliers = BigInt.fromU64(this.numberOfSuppliers);
    entity.totalReserves = this.totalReserves;
    entity.supplyRatePerBlock = this.supplyRatePerBlock;
    entity.totalBorrow = this.totalBorrow;
    entity.totalSupply = this.totalSupply;
    entity.underlyingPriceNative = this.underlyingPriceNative;
    entity.creationBlockNumber = BigInt.fromU64(this.creationBlockNumber);
    entity.creationBlockTimestamp = BigInt.fromU64(this.creationBlockTimestamp);
    entity.latestBlockNumber = BigInt.fromU64(this.latestBlockNumber);
    entity.latestBlockTimestamp = BigInt.fromU64(this.latestBlockTimestamp);
    entity.borrowIndex = this.borrowIndex;
    entity.reserveFactorPercent = this.reserveFactorPercent;
    entity.underlyingPriceUSD = this.underlyingPriceUSD;
    entity.underlyingAddress = Address.fromString(this.underlyingAddress);
    entity.underlyingDecimals = this.underlyingDecimals as i32;
    entity.compSpeedBorrowPerBlock = this.compSpeedBorrowPerBlock;
    entity.compSpeedSupplyPerBlock = this.compSpeedSupplyPerBlock;
    entity.borrowCap = this.borrowCap;
    entity.totalSupplyUSD = this.totalSupplyUSD;
    entity.supplyAPY = this.supplyAPY;
    entity.totalSupplyAPY = this.totalSupplyAPY;
    entity.totalBorrowUSD = this.totalBorrowUSD;
    entity.totalBorrowAPY = this.totalBorrowAPY;
    entity.totalReservesUSD = this.totalReservesUSD;
    entity.availableLiquidity = this.availableLiquidity;
    entity.availableLiquidityUSD = this.availableLiquidityUSD;
    entity.utilization = this.utilization;
    entity.save();
    return entity;
  }

  withCompSpeedBorrowPerBlock(compSpeedBorrowPerBlock: BigDecimal): MarketBuilder {
    this.compSpeedBorrowPerBlock = compSpeedBorrowPerBlock;
    return this;
  }

  withCompSpeedSupplyPerBlock(compSpeedSupplyPerBlock: BigDecimal): MarketBuilder {
    this.compSpeedSupplyPerBlock = compSpeedSupplyPerBlock;
    return this;
  }

  withMintsPaused(mintsPaused: boolean): MarketBuilder {
    this.mintsPaused = mintsPaused;
    return this;
  }

  withBorrowsPaused(borrowsPaused: boolean): MarketBuilder {
    this.borrowsPaused = borrowsPaused;
    return this;
  }
}
