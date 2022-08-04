import { log } from "@graphprotocol/graph-ts";
import { CTokenDecimals } from "../../constants";
import { MintEvent } from "../../types/schema";
import { Mint } from "../../types/templates/CToken/CToken";
import {
  getAccount,
  getAccountMarket,
  getMarket,
  isNonFunctionalMarket,
  updateAccountAggregates,
  updateAccountMarket,
} from "../../utils";
import { amountToDecimal } from "../../utils/amountToDecimal";

/* Account supplies assets into market and receives cTokens in exchange
 *
 * event.mintAmount is the underlying asset
 * event.mintTokens is the amount of cTokens minted
 * event.minter is the account
 *
 * Notes
 *    Transfer event will always get emitted after this
 *    Mints originate from the cToken address, not 0x000000, which is typical of ERC-20s
 *    No need to updateMarket(), handleAccrueInterest() ALWAYS runs before this
 *    No need to updateCommonCTokenStats, handleTransfer() will
 *    No need to update cTokenBalance, handleTransfer() will
 */
export function handleMint(event: Mint): void {
  const marketId = event.address.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const minterId = event.params.minter.toHexString();
  const market = getMarket(marketId, event);
  const minterAccount = getAccount(minterId, event);
  const minterAccountMarket = getAccountMarket(minterId, marketId, event);

  updateAccountMarket(minterAccountMarket, market, event);

  updateAccountAggregates(minterAccount);

  market.save();
  minterAccount.save();
  minterAccountMarket.save();

  const mintEventId = event.transaction.hash.toHexString().concat("-").concat(event.transactionLogIndex.toString());
  const cTokenAmount = amountToDecimal(event.params.mintTokens, CTokenDecimals);
  const underlyingAmount = amountToDecimal(event.params.mintAmount, market.underlyingDecimals);
  const mintEvent = new MintEvent(mintEventId);
  mintEvent.market = marketId;
  mintEvent.blockNumber = event.block.number;
  mintEvent.blockTimestamp = event.block.timestamp;
  mintEvent.from = event.address;
  mintEvent.to = event.params.minter;
  mintEvent.amount = cTokenAmount;
  mintEvent.underlyingAmount = underlyingAmount;
  mintEvent.save();
}
