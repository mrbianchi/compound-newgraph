import { log } from "@graphprotocol/graph-ts";
import { ReservesReduced } from "../../types/templates/CToken/CToken";

export function handleReservesReduced(event: ReservesReduced): void {
  log.info("ReservesReduced event handled", []);
  log.info("param admin: {}", [event.params.admin.toHexString()]);
  log.info("param reduceAmount: {}", [event.params.reduceAmount.toString()]);
  log.info("param newTotalReserves: {}", [event.params.newTotalReserves.toString()]);
}
