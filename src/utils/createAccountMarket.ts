import { ZeroBD, ZeroBI } from "../constants";
import { AccountMarket } from "../types/schema";
import { getAccountMarketId } from "./getAccountMarketId";

export function createAccountMarket(accountId: string, marketId: string): AccountMarket {
  const id = getAccountMarketId(accountId, marketId);
  const accountMarket = new AccountMarket(id);
  accountMarket.market = marketId;
  accountMarket.account = accountId;
  accountMarket.accrualBlockNumber = ZeroBI;
  accountMarket.balance = ZeroBD;
  accountMarket.totalUnderlyingSupplied = ZeroBD;
  accountMarket.totalUnderlyingRedeemed = ZeroBD;
  accountMarket.accountBorrowIndex = ZeroBD;
  accountMarket.totalUnderlyingBorrowed = ZeroBD;
  accountMarket.totalUnderlyingRepaid = ZeroBD;
  accountMarket.storedBorrowBalance = ZeroBD;
  accountMarket.enteredMarket = false;
  return accountMarket;
}
