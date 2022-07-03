import { log } from "@graphprotocol/graph-ts";
import { NewBorrowCap } from "../../types/Comptroller/Comptroller";

export function handleNewBorrowCap(event: NewBorrowCap): void {
  log.info("NewBorrowCap event handled", []);
  log.info("param cToken: {}", [event.params.cToken.toString()]);
  log.info("param newBorrowCap: {}", [event.params.newBorrowCap.toString()]);
}
