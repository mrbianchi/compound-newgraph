import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { exponentToBigDecimal } from "./exponentToBigDecimal";

export function amountToDecimal(ammount: BigInt, decimals: i32): BigDecimal {
  return ammount.toBigDecimal().div(exponentToBigDecimal(decimals)).truncate(decimals);
}
