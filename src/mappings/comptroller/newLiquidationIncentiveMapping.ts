import { MantissaFactor } from "../../constants";
import { NewLiquidationIncentive } from "../../types/Comptroller/Comptroller";
import { getComptroller } from "../../utils";
import { amountToDecimal } from "../../utils/amountToDecimal";

export function handleNewLiquidationIncentive(event: NewLiquidationIncentive): void {
  const comptroller = getComptroller();
  comptroller.liquidationIncentive = amountToDecimal(event.params.newLiquidationIncentiveMantissa, MantissaFactor);
  comptroller.save();
}
