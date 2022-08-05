import { DefaultComptrollerId } from "../constants";
import { Comptroller } from "../types/schema";
import { createComptroller } from "./createComptroller";

export function getComptroller(): Comptroller {
  let comptroller = Comptroller.load(DefaultComptrollerId);

  if (!comptroller) {
    comptroller = createComptroller();
  }

  return comptroller;
}
