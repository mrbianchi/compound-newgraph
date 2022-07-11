import { log } from "@graphprotocol/graph-ts";
import { Mint } from "../../types/templates/CToken/CToken";

// Currently not in use. Everything can be done in handleTransfer, since a Mint event
// is always done alongside a Transfer event, with the same data
export function handleMint(event: Mint): void {
  log.info("Mint event handled", []);
  log.info("param minter: {}", [event.params.minter.toHexString()]);
  log.info("param mintAmount: {}", [event.params.mintAmount.toString()]);
  log.info("param mintTokens: {}", [event.params.mintTokens.toString()]);
}
