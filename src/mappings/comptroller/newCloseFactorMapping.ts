import { MantissaFactor } from "../../constants";
import { NewCloseFactor } from "../../types/Comptroller/Comptroller";
import { getComptroller } from "../../utils";
import { amountToDecimal } from "../../utils/amountToDecimal";

export function handleNewCloseFactor(event: NewCloseFactor): void {
  const comptroller = getComptroller();
  comptroller.closeFactor = amountToDecimal(event.params.newCloseFactorMantissa, MantissaFactor);
  comptroller.save();
}
