import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { DefaultComptrollerId } from "../../src/constants";
import { Comptroller } from "../../src/types/schema";

export abstract class ComptrollerDefaultValues {
  public static readonly Id: string = DefaultComptrollerId;
  public static readonly PriceOracle: string = "0xfafafa0000000000000000000000000000000001";
  public static readonly LiquidationIncentive: u64 = 13;
  public static readonly CloseFactor: u64 = 45;
}

export class ComptrollerBuilder {
  private id: string = ComptrollerDefaultValues.Id;
  private priceOracle: string = ComptrollerDefaultValues.PriceOracle;
  private liquidationIncentive: u64 = ComptrollerDefaultValues.LiquidationIncentive;
  private closeFactor: u64 = ComptrollerDefaultValues.CloseFactor;

  build(): Comptroller {
    const entity = new Comptroller(this.id);
    entity.priceOracle = Bytes.fromHexString(this.priceOracle);
    entity.liquidationIncentive = BigInt.fromU64(this.liquidationIncentive);
    entity.closeFactor = BigInt.fromU64(this.closeFactor);
    entity.save();
    return entity;
  }

  withId(id: string): ComptrollerBuilder {
    this.id = id;
    return this;
  }

  withPriceOracle(priceOracle: string): ComptrollerBuilder {
    this.priceOracle = priceOracle;
    return this;
  }

  withLiquidationIncentive(liquidationIncentive: u64): ComptrollerBuilder {
    this.liquidationIncentive = liquidationIncentive;
    return this;
  }

  withCloseFactor(closeFactor: u64): ComptrollerBuilder {
    this.closeFactor = closeFactor;
    return this;
  }
}
