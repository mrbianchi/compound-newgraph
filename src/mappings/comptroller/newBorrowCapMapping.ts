import { log } from "@graphprotocol/graph-ts";
import { MantissaFactor } from "../../constants";
import { NewBorrowCap } from "../../types/Comptroller/Comptroller";
import { getMarket, isNonFunctionalMarket } from "../../utils";
import { amountToDecimal } from "../../utils/amountToDecimal";

export function handleNewBorrowCap(event: NewBorrowCap): void {
  const marketId = event.params.cToken.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId, event);
  market.borrowCap = amountToDecimal(event.params.newBorrowCap, MantissaFactor);
  market.save();
}
