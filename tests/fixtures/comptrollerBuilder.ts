import { BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { DefaultComptrollerId, ZeroBD } from "../../src/constants";
import { Comptroller } from "../../src/types/schema";

export abstract class ComptrollerDefaultValues {
  public static readonly Id: string = DefaultComptrollerId;
  public static readonly PriceOracleAddress: string = "0xfafafa0000000000000000000000000000000001";
  public static readonly LiquidationIncentive: BigDecimal = ZeroBD;
  public static readonly CloseFactor: BigDecimal = ZeroBD;
  public static readonly TransfersPaused: boolean = false;
  public static readonly SeizesPaused: boolean = false;
  public static readonly LatestBlockNumber: u64 = 0;
  public static readonly LatestBlockTimestamp: u64 = 0;
  public static readonly TotalSupplyUSD: BigDecimal = ZeroBD;
  public static readonly TotalBorrowUSD: BigDecimal = ZeroBD;
  public static readonly TotalReservesUSD: BigDecimal = ZeroBD;
  public static readonly Utilization: BigDecimal = ZeroBD;
}

export class ComptrollerBuilder {
  private id: string = ComptrollerDefaultValues.Id;
  private priceOracleAddress: string = ComptrollerDefaultValues.PriceOracleAddress;
  private liquidationIncentive: BigDecimal = ComptrollerDefaultValues.LiquidationIncentive;
  private closeFactor: BigDecimal = ComptrollerDefaultValues.CloseFactor;
  private transfersPaused: boolean = ComptrollerDefaultValues.TransfersPaused;
  private seizesPaused: boolean = ComptrollerDefaultValues.SeizesPaused;
  private latestBlockNumber: u64 = ComptrollerDefaultValues.LatestBlockNumber;
  private latestBlockTimestamp: u64 = ComptrollerDefaultValues.LatestBlockTimestamp;
  private totalSupplyUSD: BigDecimal = ComptrollerDefaultValues.TotalSupplyUSD;
  private totalBorrowUSD: BigDecimal = ComptrollerDefaultValues.TotalBorrowUSD;
  private totalReservesUSD: BigDecimal = ComptrollerDefaultValues.TotalReservesUSD;
  private utilization: BigDecimal = ComptrollerDefaultValues.Utilization;

  build(): Comptroller {
    const entity = new Comptroller(this.id);
    entity.priceOracleAddress = Bytes.fromHexString(this.priceOracleAddress);
    entity.liquidationIncentive = this.liquidationIncentive;
    entity.closeFactor = this.closeFactor;
    entity.transfersPaused = this.transfersPaused;
    entity.seizesPaused = this.seizesPaused;
    entity.totalSupplyUSD = this.totalSupplyUSD;
    entity.latestBlockNumber = BigInt.fromU64(this.latestBlockNumber);
    entity.latestBlockTimestamp = BigInt.fromU64(this.latestBlockTimestamp);
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

  withLiquidationIncentive(liquidationIncentive: BigDecimal): ComptrollerBuilder {
    this.liquidationIncentive = liquidationIncentive;
    return this;
  }

  withCloseFactor(closeFactor: BigDecimal): ComptrollerBuilder {
    this.closeFactor = closeFactor;
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
