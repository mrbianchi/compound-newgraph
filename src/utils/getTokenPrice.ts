import { Address, BigDecimal, Bytes, log } from "@graphprotocol/graph-ts";
import { ZeroBD } from "../constants";
import { PriceOracle } from "../types/Comptroller/PriceOracle";
import { exponentToBigDecimal } from "./exponentToBigDecimal";
import { getComptroller } from "./getComptroller";

/*
 * This must use the cToken address.
 *
 * Note this returns the value without factoring in token decimals and wei, so we must divide
 * the number by (ethDecimals - tokenDecimals) and again by the mantissa.
 * USDC would be 10 ^ ((18 - 6) + 18) = 10 ^ 30
 */
export function getTokenPrice(eventAddress: Address, underlyingDecimals: i32): BigDecimal {
  const comptroller = getComptroller();

  if (!comptroller.priceOracleAddress) {
    log.error("getTokenPrice ::: comptroller priceOracleAddress undefined", []);
    return ZeroBD;
  }

  const oracleAddress = Address.fromBytes(comptroller.priceOracleAddress as Bytes);
  const mantissaDecimalFactor = 18 - underlyingDecimals + 18;
  const bdFactor = exponentToBigDecimal(mantissaDecimalFactor);
  const oracle = PriceOracle.bind(oracleAddress);
  return oracle.getUnderlyingPrice(eventAddress).toBigDecimal().div(bdFactor);
}
