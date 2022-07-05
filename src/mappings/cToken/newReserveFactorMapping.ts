import { log } from "@graphprotocol/graph-ts";
import { NewReserveFactor } from "../../types/templates/CToken/CToken";

export function handleNewReserveFactor(event: NewReserveFactor): void {
  log.info("NewReserveFactor event handled", []);
  log.info("param oldReserveFactorMantissa: {}", [event.params.oldReserveFactorMantissa.toString()]);
  log.info("param newReserveFactorMantissa: {}", [event.params.newReserveFactorMantissa.toString()]);
}
