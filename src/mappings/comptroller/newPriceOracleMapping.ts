import { NewPriceOracle } from "../../types/Comptroller/Comptroller";
import { getComptroller } from "../../utils";

// This is the first event used in this mapping, so we use it to create the comptroller entity
export function handleNewPriceOracle(event: NewPriceOracle): void {
  const comptroller = getComptroller();
  comptroller.priceOracle = event.params.newPriceOracle;
  comptroller.save();
}
