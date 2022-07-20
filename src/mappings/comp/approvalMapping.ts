import { log } from "@graphprotocol/graph-ts";
import { Approval } from "../../types/Comp/Comp";

export function handleApproval(event: Approval): void {
  log.info("Approval event handled", []);
  log.info("param owner: {}", [event.params.owner.toHexString()]);
  log.info("param spender: {}", [event.params.spender.toHexString()]);
  log.info("param amount: {}", [event.params.amount.toString()]);
}
