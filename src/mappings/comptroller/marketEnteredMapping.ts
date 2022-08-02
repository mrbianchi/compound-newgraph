import { log } from "@graphprotocol/graph-ts";
import { MarketEntered } from "../../types/Comptroller/Comptroller";
import { addTransactionToAccountMarket, getAccount, getAccountMarket, isNonFunctionalMarket } from "../../utils";

export function handleMarketEntered(event: MarketEntered): void {
  const accountId = event.params.account.toHexString();
  const marketId = event.params.cToken.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const account = getAccount(accountId, event);
  const accountMarket = getAccountMarket(account.id, marketId, event);
  addTransactionToAccountMarket(accountMarket, event);
  accountMarket.enteredMarket = true;
  accountMarket.save();
}
