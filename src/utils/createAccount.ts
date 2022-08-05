import { ethereum } from "@graphprotocol/graph-ts";
import { ZeroBD, ZeroBI } from "../constants";
import { Account } from "../types/schema";

export function createAccount(accountId: string, event: ethereum.Event): Account {
  const account = new Account(accountId);
  account.creationBlockNumber = event.block.number;
  account.creationBlockTimestamp = event.block.timestamp;
  account.latestBlockNumber = event.block.number;
  account.latestBlockTimestamp = event.block.timestamp;
  account.countLiquidated = ZeroBI;
  account.countLiquidator = ZeroBI;
  account.hasBorrowed = false;
  account.health = ZeroBD;
  account.totalUnderlyingSuppliedUSD = ZeroBD;
  account.totalUnderlyingBorrowedUSD = ZeroBD;
  //account.markets = [];
  return account;
}
