import { log } from "@graphprotocol/graph-ts";
import { AccrueInterest } from "../../types/templates/CToken/CToken";

export function handleAccrueInterest(event: AccrueInterest): void {
  log.info("AccrueInterest event handled", []);
  log.info("param cashPrior: {}", [event.params.cashPrior.toString()]);
  log.info("param interestAccumulated: {}", [event.params.interestAccumulated.toString()]);
  log.info("param borrowIndex: {}", [event.params.borrowIndex.toString()]);
  log.info("param totalBorrows: {}", [event.params.totalBorrows.toString()]);
}
