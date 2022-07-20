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
  public static readonly BorrowRate: BigDecimal = ZeroBD;
  public static readonly Cash: BigDecimal = ZeroBD;
  public static readonly CollateralFactor: BigDecimal = ZeroBD;
  public static readonly ExchangeRate: BigDecimal = ZeroBD;
  public static readonly InterestRateModelAddress: string = "0xfafafa0000000000000000000000000000000002";
  public static readonly NumberOfBorrowers: u64 = 0;
  public static readonly NumberOfSuppliers: u64 = 0;
  public static readonly Reserves: BigDecimal = ZeroBD;
  public static readonly SupplyRate: BigDecimal = ZeroBD;
  public static readonly TotalBorrows: BigDecimal = ZeroBD;
  public static readonly TotalSupply: BigDecimal = ZeroBD;
  public static readonly UnderlyingPriceETH: BigDecimal = ZeroBD;
  public static readonly AccrualBlockNumber: u64 = 0;
  public static readonly BlockTimestamp: u64 = 0;
  public static readonly BorrowIndex: BigDecimal = ZeroBD;
  public static readonly ReserveFactor: u64 = 0;
  public static readonly UnderlyingPriceUSD: BigDecimal = ZeroBD;
  public static readonly UnderlyingAddress: string = "0xfafafa0000000000000000000000000000000003";
  public static readonly UnderlyingDecimals: number = 18;
  public static readonly CompBorrowSpeed: u64 = 0;
  public static readonly CompSupplySpeed: u64 = 0;
  public static readonly BorrowCap: u64 = 0;
}

export class MarketBuilder {
  private id: string = MarketDefaultValues.Id;
  private name: string = MarketDefaultValues.Name;
  private symbol: string = MarketDefaultValues.Symbol;
  private underlyingName: string = MarketDefaultValues.UnderlyingName;
  private underlyingSymbol: string = MarketDefaultValues.UnderlyingSymbol;
  private mintsPaused: boolean = MarketDefaultValues.MintsPaused;
  private borrowsPaused: boolean = MarketDefaultValues.BorrowsPaused;
  private borrowRate: BigDecimal = MarketDefaultValues.BorrowRate;
  private cash: BigDecimal = MarketDefaultValues.Cash;
  private collateralFactor: BigDecimal = MarketDefaultValues.CollateralFactor;
  private exchangeRate: BigDecimal = MarketDefaultValues.ExchangeRate;
  private interestRateModelAddress: string = MarketDefaultValues.InterestRateModelAddress;
  private numberOfBorrowers: u64 = MarketDefaultValues.NumberOfBorrowers;
  private numberOfSuppliers: u64 = MarketDefaultValues.NumberOfSuppliers;
  private reserves: BigDecimal = MarketDefaultValues.Reserves;
  private supplyRate: BigDecimal = MarketDefaultValues.SupplyRate;
  private totalBorrows: BigDecimal = MarketDefaultValues.TotalBorrows;
  private totalSupply: BigDecimal = MarketDefaultValues.TotalSupply;
  private underlyingPriceETH: BigDecimal = MarketDefaultValues.UnderlyingPriceETH;
  private accrualBlockNumber: u64 = MarketDefaultValues.AccrualBlockNumber;
  private blockTimestamp: u64 = MarketDefaultValues.BlockTimestamp;
  private borrowIndex: BigDecimal = MarketDefaultValues.BorrowIndex;
  private reserveFactor: u64 = MarketDefaultValues.ReserveFactor;
  private underlyingPriceUSD: BigDecimal = MarketDefaultValues.UnderlyingPriceUSD;
  private underlyingAddress: string = MarketDefaultValues.UnderlyingAddress;
  private underlyingDecimals: number = MarketDefaultValues.UnderlyingDecimals;
  private compBorrowSpeed: u64 = MarketDefaultValues.CompBorrowSpeed;
  private compSupplySpeed: u64 = MarketDefaultValues.CompSupplySpeed;
  private borrowCap: u64 = MarketDefaultValues.BorrowCap;

  build(): Market {
    const entity = new Market(this.id);
    entity.name = this.name;
    entity.symbol = this.symbol;
    entity.underlyingName = this.underlyingName;
    entity.underlyingSymbol = this.underlyingSymbol;
    entity.mintsPaused = this.mintsPaused;
    entity.borrowsPaused = this.borrowsPaused;
    entity.borrowRate = this.borrowRate;
    entity.cash = this.cash;
    entity.collateralFactor = this.collateralFactor;
    entity.exchangeRate = this.exchangeRate;
    entity.interestRateModelAddress = Address.fromString(this.interestRateModelAddress);
    entity.numberOfBorrowers = BigInt.fromU64(this.numberOfBorrowers);
    entity.numberOfSuppliers = BigInt.fromU64(this.numberOfSuppliers);
    entity.reserves = this.reserves;
    entity.supplyRate = this.supplyRate;
    entity.totalBorrows = this.totalBorrows;
    entity.totalSupply = this.totalSupply;
    entity.underlyingPriceETH = this.underlyingPriceETH;
    entity.accrualBlockNumber = BigInt.fromU64(this.accrualBlockNumber);
    entity.blockTimestamp = BigInt.fromU64(this.blockTimestamp);
    entity.borrowIndex = this.borrowIndex;
    entity.reserveFactor = BigInt.fromU64(this.reserveFactor);
    entity.underlyingPriceUSD = this.underlyingPriceUSD;
    entity.underlyingAddress = Address.fromString(this.underlyingAddress);
    entity.underlyingDecimals = this.underlyingDecimals as i32;
    entity.compBorrowSpeed = BigInt.fromU64(this.compBorrowSpeed);
    entity.compSupplySpeed = BigInt.fromU64(this.compSupplySpeed);
    entity.borrowCap = BigInt.fromU64(this.borrowCap);
    entity.save();
    return entity;
  }

  withCompBorrowSpeed(compBorrowSpeed: u64): MarketBuilder {
    this.compBorrowSpeed = compBorrowSpeed;
    return this;
  }

  withCompSupplySpeed(compSupplySpeed: u64): MarketBuilder {
    this.compSupplySpeed = compSupplySpeed;
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
