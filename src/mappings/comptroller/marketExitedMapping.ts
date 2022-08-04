import { log } from "@graphprotocol/graph-ts";
import { MarketExited } from "../../types/Comptroller/Comptroller";
import { getAccount, getAccountMarket, isNonFunctionalMarket } from "../../utils";

export function handleMarketExited(event: MarketExited): void {
  const marketId = event.params.cToken.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const accountId = event.params.account.toHexString();
  const account = getAccount(accountId, event);
  const accountMarket = getAccountMarket(account.id, marketId, event);

  accountMarket.latestBlockNumber = event.block.number;
  accountMarket.latestBlockTimestamp = event.block.timestamp;
  accountMarket.enteredMarket = false;

  accountMarket.save();
}
