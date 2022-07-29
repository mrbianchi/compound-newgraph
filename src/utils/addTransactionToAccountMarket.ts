import { ethereum } from "@graphprotocol/graph-ts";
import { AccountMarket, AccountMarketTransaction } from "../types/schema";

export function addTransactionToAccountMarket(accountMarket: AccountMarket, event: ethereum.Event): void {
  const id = accountMarket.id
    .concat("-")
    .concat(event.transaction.hash.toHexString())
    .concat("-")
    .concat(event.transactionLogIndex.toString());
  let accountMarketTransaction = AccountMarketTransaction.load(id);

  if (accountMarketTransaction != null) {
    return;
  }

  accountMarketTransaction = new AccountMarketTransaction(id);
  accountMarketTransaction.accountMarket = accountMarket.id;
  accountMarketTransaction.transactionLogIndex = event.transactionLogIndex;
  accountMarketTransaction.blockNumber = event.block.number;
  accountMarketTransaction.blockTimestamp = event.block.timestamp;
  accountMarketTransaction.transactionHash = event.transaction.hash;
  accountMarketTransaction.save();
}
