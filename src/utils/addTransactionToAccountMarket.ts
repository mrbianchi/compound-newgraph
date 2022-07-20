import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import { AccountMarket, AccountMarketTransaction } from "../types/schema";

export function addTransactionToAccountMarket(
  accountMarket: AccountMarket,
  block: ethereum.Block,
  transaction: ethereum.Transaction,
  transactionLogIndex: BigInt
): void {
  const id = accountMarket.id
    .concat("-")
    .concat(transaction.hash.toHexString())
    .concat("-")
    .concat(transactionLogIndex.toString());
  let accountMarketTransaction = AccountMarketTransaction.load(id);

  if (accountMarketTransaction != null) {
    return;
  }

  accountMarketTransaction = new AccountMarketTransaction(id);
  accountMarketTransaction.accountMarket = accountMarket.id;
  accountMarketTransaction.transactionLogIndex = transactionLogIndex;
  accountMarketTransaction.blockNumber = block.number;
  accountMarketTransaction.blockTime = block.timestamp;
  accountMarketTransaction.transactionHash = transaction.hash;
  accountMarketTransaction.save();
}
