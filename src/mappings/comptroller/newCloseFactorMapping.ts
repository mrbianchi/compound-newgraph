import { NewCloseFactor } from "../../types/Comptroller/Comptroller";
import { getComptroller } from "../../utils";

export function handleNewCloseFactor(event: NewCloseFactor): void {
  const comptroller = getComptroller();
  comptroller.closeFactorMantissa = event.params.newCloseFactorMantissa;
  comptroller.save();
}
