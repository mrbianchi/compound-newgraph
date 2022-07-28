import { BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { DefaultComptrollerId, ZeroBD } from "../../src/constants";
import { Comptroller } from "../../src/types/schema";

export abstract class ComptrollerDefaultValues {
  public static readonly Id: string = DefaultComptrollerId;
  public static readonly PriceOracleAddress: string = "0xfafafa0000000000000000000000000000000001";
  public static readonly LiquidationIncentiveMantissa: u64 = 13;
  public static readonly CloseFactorMantissa: u64 = 45;
  public static readonly TransfersPaused: boolean = false;
  public static readonly SeizesPaused: boolean = false;
  public static readonly TotalSupplyUSD: BigDecimal = ZeroBD;
  public static readonly TotalBorrowUSD: BigDecimal = ZeroBD;
  public static readonly TotalReservesUSD: BigDecimal = ZeroBD;
  public static readonly Utilization: BigDecimal = ZeroBD;
}

export class ComptrollerBuilder {
  private id: string = ComptrollerDefaultValues.Id;
  private priceOracleAddress: string = ComptrollerDefaultValues.PriceOracleAddress;
  private liquidationIncentiveMantissa: u64 = ComptrollerDefaultValues.LiquidationIncentiveMantissa;
  private closeFactorMantissa: u64 = ComptrollerDefaultValues.CloseFactorMantissa;
  private transfersPaused: boolean = ComptrollerDefaultValues.TransfersPaused;
  private seizesPaused: boolean = ComptrollerDefaultValues.SeizesPaused;
  private totalSupplyUSD: BigDecimal = ComptrollerDefaultValues.TotalSupplyUSD;
  private totalBorrowUSD: BigDecimal = ComptrollerDefaultValues.TotalBorrowUSD;
  private totalReservesUSD: BigDecimal = ComptrollerDefaultValues.TotalReservesUSD;
  private utilization: BigDecimal = ComptrollerDefaultValues.Utilization;

  build(): Comptroller {
    const entity = new Comptroller(this.id);
    entity.priceOracleAddress = Bytes.fromHexString(this.priceOracleAddress);
    entity.liquidationIncentiveMantissa = BigInt.fromU64(this.liquidationIncentiveMantissa);
    entity.closeFactorMantissa = BigInt.fromU64(this.closeFactorMantissa);
    entity.transfersPaused = this.transfersPaused;
    entity.seizesPaused = this.seizesPaused;
    entity.totalSupplyUSD = this.totalSupplyUSD;
    entity.totalBorrowUSD = this.totalBorrowUSD;
    entity.totalReservesUSD = this.totalReservesUSD;
    entity.utilization = this.utilization;
    entity.markets = [];
    entity.save();
    return entity;
  }

  withId(id: string): ComptrollerBuilder {
    this.id = id;
    return this;
  }

  withPriceOracleAddress(priceOracleAddress: string): ComptrollerBuilder {
    this.priceOracleAddress = priceOracleAddress;
    return this;
  }

  withLiquidationIncentiveMantissa(liquidationIncentiveMantissa: u64): ComptrollerBuilder {
    this.liquidationIncentiveMantissa = liquidationIncentiveMantissa;
    return this;
  }

  withCloseFactorMantissa(closeFactorMantissa: u64): ComptrollerBuilder {
    this.closeFactorMantissa = closeFactorMantissa;
    return this;
  }

  withTransfersPaused(transfersPaused: boolean): ComptrollerBuilder {
    this.transfersPaused = transfersPaused;
    return this;
  }

  withSeizesPaused(seizesPaused: boolean): ComptrollerBuilder {
    this.seizesPaused = seizesPaused;
    return this;
  }
}
