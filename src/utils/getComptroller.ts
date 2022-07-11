import { DefaultComptrollerId } from "../constants";
import { Comptroller } from "../types/schema";

export function getComptroller(): Comptroller {
  let comptroller = Comptroller.load(DefaultComptrollerId);

  if (!comptroller) {
    comptroller = new Comptroller(DefaultComptrollerId);
  }

  return comptroller;
}
