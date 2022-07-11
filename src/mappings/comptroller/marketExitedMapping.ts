import { log } from "@graphprotocol/graph-ts";
import { MarketExited } from "../../types/Comptroller/Comptroller";
import { Market } from "../../types/schema";
import { updateCommonCTokenStats } from "../../utils";

export function handleMarketExited(event: MarketExited): void {
  const market = Market.load(event.params.cToken.toHexString());

  if (!market) {
    log.info("Market({}) not found", [event.params.cToken.toHexString()]);
    return;
  }

  const accountID = event.params.account.toHex();
  const cTokenStats = updateCommonCTokenStats(
    market.id,
    market.symbol,
    accountID,
    event.transaction.hash,
    event.block.timestamp.toI32(),
    event.block.number.toI32()
  );
  cTokenStats.enteredMarket = false;
  cTokenStats.save();
}
