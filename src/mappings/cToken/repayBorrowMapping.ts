import { log } from "@graphprotocol/graph-ts";
import { RepayBorrow } from "../../types/templates/CToken/CToken";

export function handleRepayBorrow(event: RepayBorrow): void {
  log.info("RepayBorrow event handled", []);
  log.info("param payer: {}", [event.params.payer.toHexString()]);
  log.info("param borrower: {}", [event.params.borrower.toHexString()]);
  log.info("param repayAmount: {}", [event.params.repayAmount.toString()]);
  log.info("param accountBorrows: {}", [event.params.accountBorrows.toString()]);
  log.info("param totalBorrows: {}", [event.params.totalBorrows.toString()]);
}
