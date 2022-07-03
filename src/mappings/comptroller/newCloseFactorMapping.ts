import { log } from "@graphprotocol/graph-ts";
import { NewCloseFactor } from "../../types/Comptroller/Comptroller";
import { Comptroller } from "../../types/schema";

export function handleNewCloseFactor(event: NewCloseFactor): void {
  const comptroller = Comptroller.load("1");

  if (!comptroller) {
    log.info("Comptroller(1) not found", []);
    return;
  }

  comptroller.closeFactor = event.params.newCloseFactorMantissa;
  comptroller.save();
}
