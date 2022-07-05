import { log } from "@graphprotocol/graph-ts";
import { Mint } from "../../types/templates/CToken/CToken";

export function handleMint(event: Mint): void {
  log.info("Mint event handled", []);
  log.info("param minter: {}", [event.params.minter.toHexString()]);
  log.info("param mintAmount: {}", [event.params.mintAmount.toString()]);
  log.info("param mintTokens: {}", [event.params.mintTokens.toString()]);
}
