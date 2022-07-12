import { Bytes, ethereum } from "@graphprotocol/graph-ts";
import { ZeroBD, ZeroBI } from "../constants";
import { AccountCToken } from "../types/schema";

function createAccountCToken(cTokenStatsId: string, symbol: string, account: string, marketId: string): AccountCToken {
  const cTokenStats = new AccountCToken(cTokenStatsId);
  cTokenStats.symbol = symbol;
  cTokenStats.market = marketId;
  cTokenStats.account = account;
  cTokenStats.transactionHashes = [];
  cTokenStats.transactionTimes = [];
  cTokenStats.accrualBlockNumber = ZeroBI;
  cTokenStats.cTokenBalance = ZeroBD;
  cTokenStats.totalUnderlyingSupplied = ZeroBD;
  cTokenStats.totalUnderlyingRedeemed = ZeroBD;
  cTokenStats.accountBorrowIndex = ZeroBD;
  cTokenStats.totalUnderlyingBorrowed = ZeroBD;
  cTokenStats.totalUnderlyingRepaid = ZeroBD;
  cTokenStats.storedBorrowBalance = ZeroBD;
  cTokenStats.enteredMarket = false;
  return cTokenStats;
}

export function updateCommonCTokenStats(
  marketId: string,
  marketSymbol: string,
  accountId: string,
  txHash: Bytes,
  block: ethereum.Block
): AccountCToken {
  const cTokenStatsId = marketId.concat("-").concat(accountId);
  let cTokenStats = AccountCToken.load(cTokenStatsId);
  if (cTokenStats == null) {
    cTokenStats = createAccountCToken(cTokenStatsId, marketSymbol, accountId, marketId);
  }
  const txHashes = cTokenStats.transactionHashes;
  txHashes.push(txHash);
  cTokenStats.transactionHashes = txHashes;
  const txTimes = cTokenStats.transactionTimes;
  txTimes.push(block.timestamp);
  cTokenStats.transactionTimes = txTimes;
  cTokenStats.accrualBlockNumber = block.number;
  return cTokenStats as AccountCToken;
}
