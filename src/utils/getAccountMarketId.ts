export function getAccountMarketId(accountId: string, marketId: string): string {
  return accountId.concat("-").concat(marketId);
}
