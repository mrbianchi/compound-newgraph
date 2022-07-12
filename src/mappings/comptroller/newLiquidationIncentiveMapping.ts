import { NewLiquidationIncentive } from "../../types/Comptroller/Comptroller";
import { getComptroller } from "../../utils";

// This should be the first event acccording to etherscan but it isn't.... price oracle is. weird
export function handleNewLiquidationIncentive(event: NewLiquidationIncentive): void {
  const comptroller = getComptroller();
  comptroller.liquidationIncentive = event.params.newLiquidationIncentiveMantissa;
  comptroller.save();
}
