import { log } from "@graphprotocol/graph-ts";
import { AccrueInterest } from "../../types/templates/CToken/CToken";
import { getMarket, isNonFunctionalMarket, updateMarket } from "../../utils";
import { updateAllHistoricalData } from "../../utils/updateAllHistoricalData";

/* Notes
 *    Executed always first on Borrow, Liquidate, Mint, Redeem and RepayBorrow
 */
export function handleAccrueInterest(event: AccrueInterest): void {
  const marketId = event.address.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const market = getMarket(marketId, event);

  updateMarket(market, event);
  updateAllHistoricalData(market, event);

  market.save();
}
