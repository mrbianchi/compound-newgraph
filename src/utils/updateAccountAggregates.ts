import { ZeroBD } from "../constants";
import { Account, AccountMarket } from "../types/schema";

export function updateAccountAggregates(account: Account): void {
  if (!account.markets) {
    return;
  }

  const accountMarketIds = account.markets as string[];
  const numUserMarkets = accountMarketIds.length;

  let totalUnderlyingSuppliedUSD = ZeroBD;
  let totalUnderlyingBorrowedUSD = ZeroBD;

  for (let i = 0; i < numUserMarkets; i++) {
    const accountMarketId = accountMarketIds[i];
    const accountMarket = AccountMarket.load(accountMarketId);

    if (accountMarket) {
      totalUnderlyingSuppliedUSD = totalUnderlyingSuppliedUSD.plus(accountMarket.totalUnderlyingSuppliedUSD);
      totalUnderlyingBorrowedUSD = totalUnderlyingBorrowedUSD.plus(accountMarket.totalUnderlyingBorrowedUSD);
    }
  }

  account.totalUnderlyingSuppliedUSD = totalUnderlyingSuppliedUSD;
  account.totalUnderlyingBorrowedUSD = totalUnderlyingBorrowedUSD;
}
