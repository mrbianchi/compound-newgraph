import { log } from "@graphprotocol/graph-ts";
import { MarketEntered } from "../../types/Comptroller/Comptroller";
import { addTransactionToAccountMarket, getAccountMarket, isNonFunctionalMarket } from "../../utils";

export function handleMarketEntered(event: MarketEntered): void {
  const accountId = event.params.account.toHexString();
  const marketId = event.params.cToken.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const accountMarket = getAccountMarket(accountId, marketId, event);
  addTransactionToAccountMarket(accountMarket, event);
  accountMarket.enteredMarket = true;
  accountMarket.save();
}
