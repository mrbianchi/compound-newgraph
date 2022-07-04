import { log } from "@graphprotocol/graph-ts";
import { DistributedBorrowerComp } from "../../types/Comptroller/Comptroller";

export function handleDistributedBorrowerComp(event: DistributedBorrowerComp): void {
  log.info("DistributedBorrowerComp event handled", []);
  log.info("param cToken: {}", [event.params.cToken.toHexString()]);
  log.info("param borrower: {}", [event.params.borrower.toHexString()]);
  log.info("param compDelta: {}", [event.params.compDelta.toString()]);
  log.info("param compBorrowIndex: {}", [event.params.compBorrowIndex.toString()]);
}
