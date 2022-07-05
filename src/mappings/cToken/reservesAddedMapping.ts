import { log } from "@graphprotocol/graph-ts";
import { ReservesAdded } from "../../types/templates/CToken/CToken";

export function handleReservesAdded(event: ReservesAdded): void {
  log.info("ReservesAdded event handled", []);
  log.info("param benefactor: {}", [event.params.benefactor.toHexString()]);
  log.info("param addAmount: {}", [event.params.addAmount.toString()]);
  log.info("param newTotalReserves: {}", [event.params.newTotalReserves.toString()]);
}
