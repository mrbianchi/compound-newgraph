import { NewPriceOracle } from "../../types/Comptroller/Comptroller";
import { Comptroller } from "../../types/schema";

export function handleNewPriceOracle(event: NewPriceOracle): void {
  let comptroller = Comptroller.load("1");
  // This is the first event used in this mapping, so we use it to create the entity
  if (comptroller == null) {
    comptroller = new Comptroller("1");
  }
  comptroller.priceOracle = event.params.newPriceOracle;
  comptroller.save();
}
