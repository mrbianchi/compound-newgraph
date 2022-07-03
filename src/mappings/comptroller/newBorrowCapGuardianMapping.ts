import { log } from "@graphprotocol/graph-ts";
import { NewBorrowCapGuardian } from "../../types/Comptroller/Comptroller";

export function handleNewBorrowCapGuardian(event: NewBorrowCapGuardian): void {
  log.info("NewBorrowCapGuardian event handled", []);
  log.info("param oldBorrowCapGuardian: {}", [event.params.oldBorrowCapGuardian.toString()]);
  log.info("param newBorrowCapGuardian: {}", [event.params.newBorrowCapGuardian.toString()]);
}
