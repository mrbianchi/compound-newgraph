import { log } from "@graphprotocol/graph-ts";
import { ExecuteTransaction } from "../../types/Timelock/Timelock";

export function handleExecuteTransaction(event: ExecuteTransaction): void {
  log.info("ExecuteTransaction event handled", []);
  log.info("param txHash: {}", [event.params.txHash.toString()]);
  log.info("param target: {}", [event.params.target.toString()]);
  log.info("param value: {}", [event.params.value.toString()]);
  log.info("param signature: {}", [event.params.signature.toString()]);
  log.info("param data: {}", [event.params.data.toString()]);
  log.info("param eta: {}", [event.params.eta.toString()]);
}
