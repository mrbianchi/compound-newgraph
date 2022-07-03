import { log } from "@graphprotocol/graph-ts";
import { NewLiquidationIncentive } from "../../types/Comptroller/Comptroller";
import { Comptroller } from "../../types/schema";

export function handleNewLiquidationIncentive(event: NewLiquidationIncentive): void {
  const comptroller = Comptroller.load("1");

  if (!comptroller) {
    log.info("Comptroller(1) not found", []);
    return;
  }

  comptroller.liquidationIncentive = event.params.newLiquidationIncentiveMantissa;
  comptroller.save();
}
