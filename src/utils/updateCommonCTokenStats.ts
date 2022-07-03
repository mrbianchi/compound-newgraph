import { BigDecimal, Bytes } from "@graphprotocol/graph-ts/index";
import { AccountCToken } from "../types/schema";

const zeroBD = BigDecimal.fromString("0");

function createAccountCToken(cTokenStatsID: string, symbol: string, account: string, marketID: string): AccountCToken {
  const cTokenStats = new AccountCToken(cTokenStatsID);
  cTokenStats.symbol = symbol;
  cTokenStats.market = marketID;
  cTokenStats.account = account;
  cTokenStats.transactionHashes = [];
  cTokenStats.transactionTimes = [];
  cTokenStats.accrualBlockNumber = 0;
  cTokenStats.cTokenBalance = zeroBD;
  cTokenStats.totalUnderlyingSupplied = zeroBD;
  cTokenStats.totalUnderlyingRedeemed = zeroBD;
  cTokenStats.accountBorrowIndex = zeroBD;
  cTokenStats.totalUnderlyingBorrowed = zeroBD;
  cTokenStats.totalUnderlyingRepaid = zeroBD;
  cTokenStats.storedBorrowBalance = zeroBD;
  cTokenStats.enteredMarket = false;
  return cTokenStats;
}

export function updateCommonCTokenStats(
  marketID: string,
  marketSymbol: string,
  accountID: string,
  txHash: Bytes,
  timestamp: i32,
  blockNumber: i32,
): AccountCToken {
  const cTokenStatsID = marketID.concat("-").concat(accountID);
  let cTokenStats = AccountCToken.load(cTokenStatsID);
  if (cTokenStats == null) {
    cTokenStats = createAccountCToken(cTokenStatsID, marketSymbol, accountID, marketID);
  }
  const txHashes = cTokenStats.transactionHashes;
  txHashes.push(txHash);
  cTokenStats.transactionHashes = txHashes;
  const txTimes = cTokenStats.transactionTimes;
  txTimes.push(timestamp);
  cTokenStats.transactionTimes = txTimes;
  cTokenStats.accrualBlockNumber = blockNumber;
  return cTokenStats as AccountCToken;
}
