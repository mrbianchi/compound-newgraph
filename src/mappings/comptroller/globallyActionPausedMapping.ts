import { GlobalActionTypes } from "../../constants";
import { ActionPaused } from "../../types/Comptroller/Comptroller";
import { getComptroller } from "../../utils";

export function handleGloballyActionPaused(event: ActionPaused): void {
  const comptroller = getComptroller();

  if (event.params.action == GlobalActionTypes.Transfer) {
    comptroller.transfersPaused = event.params.pauseState;
  } else if (event.params.action == GlobalActionTypes.Seize) {
    comptroller.seizesPaused = event.params.pauseState;
  }

  comptroller.save();
}
