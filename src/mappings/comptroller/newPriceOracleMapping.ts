import { NewPriceOracle } from "../../types/Comptroller/Comptroller";
import { getComptroller } from "../../utils";

export function handleNewPriceOracle(event: NewPriceOracle): void {
  const comptroller = getComptroller();
  comptroller.priceOracleAddress = event.params.newPriceOracle;
  comptroller.save();
}
