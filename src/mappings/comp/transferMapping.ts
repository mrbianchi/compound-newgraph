import { log } from "@graphprotocol/graph-ts";
import { Transfer } from "../../types/Comp/Comp";

export function handleTransfer(event: Transfer): void {
  log.info("Transfer event handled", []);
  log.info("param from: {}", [event.params.from.toString()]);
  log.info("param to: {}", [event.params.to.toString()]);
  log.info("param amount: {}", [event.params.amount.toString()]);
}
