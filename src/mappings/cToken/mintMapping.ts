import { CTokenDecimals, CTokenDecimalsBD } from "../../constants";
import { MintEvent } from "../../types/schema";
import { Mint } from "../../types/templates/CToken/CToken";
import { exponentToBigDecimal, getMarket } from "../../utils";

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
export function handleMint(event: Mint): void {
  const marketId = event.address.toHexString();
  const market = getMarket(marketId);

  const mintEventId = event.transaction.hash.toHexString().concat("-").concat(event.transactionLogIndex.toString());
  const cTokenAmount = event.params.mintTokens.toBigDecimal().div(CTokenDecimalsBD).truncate(CTokenDecimals);
  const underlyingAmount = event.params.mintAmount
    .toBigDecimal()
    .div(exponentToBigDecimal(market.underlyingDecimals))
    .truncate(market.underlyingDecimals);

  const mintEvent = new MintEvent(mintEventId);
  mintEvent.market = marketId;
  mintEvent.blockNumber = event.block.number;
  mintEvent.blockTime = event.block.timestamp;
  mintEvent.from = event.address;
  mintEvent.to = event.params.minter;
  mintEvent.amount = cTokenAmount;
  mintEvent.underlyingAmount = underlyingAmount;
  mintEvent.save();
}
