import { log } from "@graphprotocol/graph-ts";
import { LiquidateBorrow } from "../../types/templates/CToken/CToken";

export function handleLiquidateBorrow(event: LiquidateBorrow): void {
  log.info("LiquidateBorrow event handled", []);
  log.info("param liquidator: {}", [event.params.liquidator.toHexString()]);
  log.info("param borrower: {}", [event.params.borrower.toHexString()]);
  log.info("param repayAmount: {}", [event.params.repayAmount.toString()]);
  log.info("param cTokenCollateral: {}", [event.params.cTokenCollateral.toHexString()]);
  log.info("param seizeTokens: {}", [event.params.seizeTokens.toString()]);
}
