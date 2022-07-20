import { NewLiquidationIncentive } from "../../types/Comptroller/Comptroller";
import { getComptroller } from "../../utils";

export function handleNewLiquidationIncentive(event: NewLiquidationIncentive): void {
  const comptroller = getComptroller();
  comptroller.liquidationIncentiveMantissa = event.params.newLiquidationIncentiveMantissa;
  comptroller.save();
}
