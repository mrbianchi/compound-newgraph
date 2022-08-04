import { BigInt, log } from "@graphprotocol/graph-ts";
import { CTokenDecimals, ZeroBD } from "../../constants";
import { TransferEvent } from "../../types/schema";
import { Transfer } from "../../types/templates/CToken/CToken";
import {
  getAccount,
  getAccountMarket,
  getMarket,
  isNonFunctionalMarket,
  updateAccountAggregates,
  updateAccountMarket,
  updateMarket,
} from "../../utils";
import { amountToDecimal } from "../../utils/amountToDecimal";
import { updateAllHistoricalData } from "../../utils/updateAllHistoricalData";

/* Transferring of cTokens
 *
 * event.params.from = sender of cTokens
 * event.params.to = receiver of cTokens
 * event.params.amount = amount sent
 *
 * Notes
 *    Possible ways to emit Transfer:
 *      seize() - i.e. a Liquidation Transfer (does not emit anything else)
 *      redeemFresh() - i.e. redeeming your cTokens for underlying asset
 *      mintFresh() - i.e. you are lending underlying assets to create ctokens
 *      transfer() - i.e. a basic transfer
 *    This function handles all 4 cases. Transfer is emitted alongside the mint, redeem, and seize
 *    events. So for those events, we do not update cToken balances.
 */
export function handleTransfer(event: Transfer): void {
  // We only updateMarket() if accrual block number is not up to date. This will only happen
  // with normal transfers, since mint, redeem, and seize transfers will already run updateMarket()
  const marketId = event.address.toHexString();

  if (isNonFunctionalMarket(marketId)) {
    log.error("Non functional market {}", [marketId]);
    return;
  }

  const accountFromId = event.params.from.toHexString();
  const accountToId = event.params.to.toHexString();
  const market = getMarket(marketId, event);

  updateMarket(market, event);

  const amountUnderlying = market.exchangeRate.times(amountToDecimal(event.params.amount, CTokenDecimals));

  // Checking if the tx is FROM the cToken contract (i.e. this will not run when minting)
  // If so, it is a mint, and we don't need to run these calculations
  if (accountFromId != marketId) {
    const accountFrom = getAccount(accountFromId, event);
    const accountMarketFrom = getAccountMarket(accountFrom.id, marketId, event);

    updateAccountMarket(accountMarketFrom, market, event);
    accountMarketFrom.totalUnderlyingRedeemed = accountMarketFrom.totalUnderlyingRedeemed.plus(amountUnderlying);

    if (accountMarketFrom.balance.equals(ZeroBD)) {
      market.numberOfSuppliers = market.numberOfSuppliers.minus(BigInt.fromU64(1));
    }

    updateAccountAggregates(accountFrom);

    accountFrom.save();
    accountMarketFrom.save();
  }

  // Checking if the tx is TO the cToken contract (i.e. this will not run when redeeming)
  // If so, we ignore it. this leaves an edge case, where someone who accidentally sends
  // cTokens to a cToken contract, where it will not get recorded. Right now it would
  // be messy to include, so we are leaving it out for now TODO fix this in future
  if (accountToId != marketId) {
    const accountTo = getAccount(accountToId, event);
    const accountMarketTo = getAccountMarket(accountTo.id, marketId, event);
    const previousCTokenBalanceTo = accountMarketTo.balance;

    updateAccountMarket(accountMarketTo, market, event);

    // checking edge case for transfers of 0
    if (previousCTokenBalanceTo.equals(ZeroBD) && !event.params.amount.toBigDecimal().equals(ZeroBD)) {
      market.numberOfSuppliers = market.numberOfSuppliers.plus(BigInt.fromU64(1));
    }

    updateAccountAggregates(accountTo);

    accountTo.save();
    accountMarketTo.save();
  }

  updateAllHistoricalData(market, event);

  market.save();

  const transferEventId = event.transaction.hash.toHexString().concat("-").concat(event.transactionLogIndex.toString());
  const transferEvent = new TransferEvent(transferEventId);
  transferEvent.market = marketId;
  transferEvent.blockNumber = event.block.number;
  transferEvent.blockTimestamp = event.block.timestamp;
  transferEvent.from = event.params.from;
  transferEvent.to = event.params.to;
  transferEvent.amount = amountToDecimal(event.params.amount, CTokenDecimals);
  transferEvent.save();
}
