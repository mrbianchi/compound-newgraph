import { NewBorrowCap } from "../../types/Comptroller/Comptroller";
import { getMarket } from "../../utils";

export function handleNewBorrowCap(event: NewBorrowCap): void {
  const marketId = event.params.cToken.toHexString();
  const market = getMarket(marketId);
  market.borrowCap = event.params.newBorrowCap;
  market.save();
}
