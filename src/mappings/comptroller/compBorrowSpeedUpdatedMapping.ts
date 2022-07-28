import { log } from "@graphprotocol/graph-ts";
import { CompBorrowSpeedUpdated } from "../../types/Comptroller/Comptroller";
import { getMarket, isNonFunctionalMarket } from "../../utils";

export function handleCompBorrowSpeedUpdated(event: CompBorrowSpeedUpdated): void {
  const marketId = event.params.cToken.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId);
  market.compSpeedBorrow = event.params.newSpeed;
  market.save();
}
