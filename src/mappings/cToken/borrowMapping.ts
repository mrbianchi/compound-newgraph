import { log } from "@graphprotocol/graph-ts";
import { Borrow } from "../../types/templates/CToken/CToken";

export function handleBorrow(event: Borrow): void {
  log.info("Borrow event handled", []);
  log.info("param borrower: {}", [event.params.borrower.toHexString()]);
  log.info("param borrowAmount: {}", [event.params.borrowAmount.toString()]);
  log.info("param accountBorrows: {}", [event.params.accountBorrows.toString()]);
  log.info("param totalBorrows: {}", [event.params.totalBorrows.toString()]);
}
