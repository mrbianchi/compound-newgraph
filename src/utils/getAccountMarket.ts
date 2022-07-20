import { AccountMarket } from "../types/schema";
import { createAccountMarket } from "./createAccountMarket";
import { getAccountMarketId } from "./getAccountMarketId";

export function getAccountMarket(accountId: string, marketId: string): AccountMarket {
  const accountMarketId = getAccountMarketId(accountId, marketId);
  let accountMarket = AccountMarket.load(accountMarketId);

  if (!accountMarket) {
    accountMarket = createAccountMarket(accountId, marketId);
  }

  return accountMarket;
}
