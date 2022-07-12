import { Address, BigDecimal, log } from "@graphprotocol/graph-ts";
import { ZeroBD } from "../constants";
import { PriceOracle } from "../types/Comptroller/PriceOracle";
import { exponentToBigDecimal } from "./exponentToBigDecimal";
import { getComptroller } from "./getComptroller";

/* PriceOracle2 is used at the block the Comptroller starts using it.
 * see here https://etherscan.io/address/0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b#events
 * Search for event topic 0xd52b2b9b7e9ee655fcb95d2e5b9e0c9f69e7ef2b8e9d2d0ea78402d576d22e22,
 * and see block 7715908.
 *
 * This must use the cToken address.
 *
 * Note this returns the value without factoring in token decimals and wei, so we must divide
 * the number by (ethDecimals - tokenDecimals) and again by the mantissa.
 * USDC would be 10 ^ ((18 - 6) + 18) = 10 ^ 30
 *
 * Note that they deployed 3 different PriceOracles at the beginning of the Comptroller,
 * and that they handle the decimals different, which can break the subgraph. So we actually
 * defer to Oracle 1 before block 7715908, which works,
 * until this one is deployed, which was used for 121 days */

/* PriceOracle(1) is used (only for the first ~100 blocks of Comptroller. Annoying but we must
 * handle this. We use it for more than 100 blocks, see reason at top of if statement
 * of PriceOracle2.
 *
 * This must use the token address, not the cToken address.
 *
 * Note this returns the value already factoring in token decimals and wei, therefore
 * we only need to divide by the mantissa, 10^18 */

// Used for all cERC20 contracts
export function getTokenPrice(eventAddress: Address, underlyingDecimals: i32): BigDecimal {
  const comptroller = getComptroller();

  if (!comptroller.priceOracle) {
    log.error("getTokenPrice ::: comptroller priceOracle undefined", []);
    return ZeroBD;
  }

  const oracleAddress = Address.fromBytes(comptroller.priceOracle);
  const mantissaDecimalFactor = 18 - underlyingDecimals + 18;
  const bdFactor = exponentToBigDecimal(mantissaDecimalFactor);
  const oracle = PriceOracle.bind(oracleAddress);
  return oracle.getUnderlyingPrice(eventAddress).toBigDecimal().div(bdFactor);
}
