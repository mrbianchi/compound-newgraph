import { log } from "@graphprotocol/graph-ts";
import { Mint } from "../../types/templates/CToken/CToken";

/* Account supplies assets into market and receives cTokens in exchange
 *
 * event.mintAmount is the underlying asset
 * event.mintTokens is the amount of cTokens minted
 * event.minter is the account
 *
 * Notes
 *    Transfer event will always get emitted with this
 *    Mints originate from the cToken address, not 0x000000, which is typical of ERC-20s
 *    No need to updateMarket(), handleAccrueInterest() ALWAYS runs before this
 *    No need to updateCommonCTokenStats, handleTransfer() will
 *    No need to update cTokenBalance, handleTransfer() will
 */
// Currently not in use. Everything can be done in handleTransfer, since a Mint event
// is always done alongside a Transfer event, with the same data
export function handleMint(event: Mint): void {
  log.info("Mint event handled", []);
  log.info("param minter: {}", [event.params.minter.toHexString()]);
  log.info("param mintAmount: {}", [event.params.mintAmount.toString()]);
  log.info("param mintTokens: {}", [event.params.mintTokens.toString()]);
}
