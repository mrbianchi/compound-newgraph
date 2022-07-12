import { BigInt } from "@graphprotocol/graph-ts";
import { CTokenDecimals, CTokenDecimalsBD, ZeroBD } from "../../constants";
import { Transfer } from "../../types/templates/CToken/CToken";
import { getAccount, getMarket, updateCommonCTokenStats, updateMarket } from "../../utils";

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
  const accountFromId = event.params.from.toHexString();
  const accountToId = event.params.to.toHexString();
  let market = getMarket(marketId);
  market = updateMarket(market, event.block);

  const amountUnderlying = market.exchangeRate.times(event.params.amount.toBigDecimal().div(CTokenDecimalsBD));
  const amountUnderylingTruncated = amountUnderlying.truncate(market.underlyingDecimals);

  // Checking if the tx is FROM the cToken contract (i.e. this will not run when minting)
  // If so, it is a mint, and we don't need to run these calculations
  if (accountFromId != marketId) {
    const accountFrom = getAccount(accountFromId);

    // Update cTokenStats common for all events, and return the stats to update unique
    // values for each event
    const cTokenStatsFrom = updateCommonCTokenStats(
      market.id,
      market.symbol,
      accountFromId,
      event.transaction.hash,
      event.block
    );

    cTokenStatsFrom.cTokenBalance = cTokenStatsFrom.cTokenBalance.minus(
      event.params.amount.toBigDecimal().div(CTokenDecimalsBD).truncate(CTokenDecimals)
    );

    cTokenStatsFrom.totalUnderlyingRedeemed = cTokenStatsFrom.totalUnderlyingRedeemed.plus(amountUnderylingTruncated);
    cTokenStatsFrom.save();

    if (cTokenStatsFrom.cTokenBalance.equals(ZeroBD)) {
      market.numberOfSuppliers = market.numberOfSuppliers.minus(BigInt.fromU64(1));
      market.save();
    }

    accountFrom.save();
  }

  // Checking if the tx is TO the cToken contract (i.e. this will not run when redeeming)
  // If so, we ignore it. this leaves an edge case, where someone who accidentally sends
  // cTokens to a cToken contract, where it will not get recorded. Right now it would
  // be messy to include, so we are leaving it out for now TODO fix this in future
  if (accountToId != marketId) {
    const accountTo = getAccount(accountToId);

    // Update cTokenStats common for all events, and return the stats to update unique
    // values for each event
    const cTokenStatsTo = updateCommonCTokenStats(market.id, market.symbol, accountToId, event.transaction.hash, event.block);

    const previousCTokenBalanceTo = cTokenStatsTo.cTokenBalance;
    cTokenStatsTo.cTokenBalance = cTokenStatsTo.cTokenBalance.plus(
      event.params.amount.toBigDecimal().div(CTokenDecimalsBD).truncate(CTokenDecimals)
    );

    cTokenStatsTo.totalUnderlyingSupplied = cTokenStatsTo.totalUnderlyingSupplied.plus(amountUnderylingTruncated);
    cTokenStatsTo.save();

    // checking edge case for transfers of 0
    if (previousCTokenBalanceTo.equals(ZeroBD) && !event.params.amount.toBigDecimal().equals(ZeroBD)) {
      market.numberOfSuppliers = market.numberOfSuppliers.plus(BigInt.fromU64(1));
      market.save();
    }

    accountTo.save();
  }
}
