import { MarketEntered } from "../../types/Comptroller/Comptroller";
import { getMarket, updateCommonCTokenStats } from "../../utils";

export function handleMarketEntered(event: MarketEntered): void {
  const marketId = event.params.cToken.toHexString();
  const accountId = event.params.account.toHexString();
  const market = getMarket(marketId);
  const cTokenStats = updateCommonCTokenStats(market.id, market.symbol, accountId, event.transaction.hash, event.block);
  cTokenStats.enteredMarket = true;
  cTokenStats.save();
}
