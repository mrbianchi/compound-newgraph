import { log } from "@graphprotocol/graph-ts";
import { MarketExited } from "../../types/Comptroller/Comptroller";
import { addTransactionToAccountMarket, getAccountMarket, isNonFunctionalMarket } from "../../utils";

export function handleMarketExited(event: MarketExited): void {
  const accountId = event.params.account.toHexString();
  const marketId = event.params.cToken.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const accountMarket = getAccountMarket(accountId, marketId, event);
  addTransactionToAccountMarket(accountMarket, event);
  accountMarket.enteredMarket = false;
  accountMarket.save();
}
