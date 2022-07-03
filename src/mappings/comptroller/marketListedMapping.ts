import { log } from "@graphprotocol/graph-ts";
import { MarketListed } from "../../types/Comptroller/Comptroller";

export function handleMarketListed(event: MarketListed): void {
  log.info("MarketListed event handled", []);
  log.info("param cToken: {}", [event.params.cToken.toString()]);
}
