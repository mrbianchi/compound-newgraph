import { ethereum } from "@graphprotocol/graph-ts";
import { ZeroBD } from "../constants";
import { AccountMarket } from "../types/schema";
import { getAccountMarketId } from "./getAccountMarketId";

export function createAccountMarket(accountId: string, marketId: string, event: ethereum.Event): AccountMarket {
  const id = getAccountMarketId(accountId, marketId);
  const accountMarket = new AccountMarket(id);
  accountMarket.market = marketId;
  accountMarket.account = accountId;
  accountMarket.creationBlockNumber = event.block.number;
  accountMarket.creationBlockTimestamp = event.block.timestamp;
  accountMarket.latestBlockNumber = event.block.number;
  accountMarket.latestBlockTimestamp = event.block.timestamp;
  accountMarket.enteredMarket = false;
  accountMarket.balance = ZeroBD;
  accountMarket.totalUnderlyingSupplied = ZeroBD;
  accountMarket.totalUnderlyingSuppliedUSD = ZeroBD;
  accountMarket.totalUnderlyingRedeemed = ZeroBD;
  accountMarket.accountBorrowIndex = ZeroBD;
  accountMarket.totalUnderlyingBorrowed = ZeroBD;
  accountMarket.totalUnderlyingBorrowedUSD = ZeroBD;
  accountMarket.totalUnderlyingRepaid = ZeroBD;
  accountMarket.storedBorrowBalance = ZeroBD;
  //accountMarket.transactions = [];
  return accountMarket;
}
