import { log } from "@graphprotocol/graph-ts";
import { NewBorrowCap } from "../../types/Comptroller/Comptroller";
import { getMarket, isNonFunctionalMarket } from "../../utils";

export function handleNewBorrowCap(event: NewBorrowCap): void {
  const marketId = event.params.cToken.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId);
  market.borrowCap = event.params.newBorrowCap;
  market.save();
}
