import { Address, BigDecimal, log } from "@graphprotocol/graph-ts";
import { ZeroBD, cUSDCAddress } from "../constants";
import { PriceOracle } from "../types/Comptroller/PriceOracle";
import { exponentToBigDecimal } from "./exponentToBigDecimal";
import { getComptroller } from "./getComptroller";

// Returns the price of USDC in eth. i.e. 0.005 would mean ETH is $200
export function getUSDCpriceETH(): BigDecimal {
  const comptroller = getComptroller();

  if (!comptroller.priceOracle) {
    log.error("getUSDCpriceETH ::: comptroller priceOracle undefined", []);
    return ZeroBD;
  }

  const oracleAddress = Address.fromBytes(comptroller.priceOracle);
  const oracle = PriceOracle.bind(oracleAddress);
  const mantissaDecimalFactorUSDC = 18 - 6 + 18;
  const bdFactorUSDC = exponentToBigDecimal(mantissaDecimalFactorUSDC);
  return oracle.getUnderlyingPrice(Address.fromString(cUSDCAddress)).toBigDecimal().div(bdFactorUSDC);
}
