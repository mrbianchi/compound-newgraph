import { Address, ethereum } from "@graphprotocol/graph-ts";
import { CTokenDecimals } from "../constants";
import { AccountMarket, Market } from "../types/schema";
import { CToken } from "../types/templates/CToken/CToken";
import { amountToDecimal } from "./amountToDecimal";

export function updateAccountMarket(accountMarket: AccountMarket, market: Market, event: ethereum.Event): void {
  const accountAddress = Address.fromString(accountMarket.account);
  const marketAddress = Address.fromString(market.id);
  const contract = CToken.bind(marketAddress);
  const tryBalanceOf = contract.try_balanceOf(accountAddress);
  const tryBorrowBalance = contract.try_borrowBalanceCurrent(accountAddress);

  accountMarket.latestBlockNumber = event.block.number;
  accountMarket.latestBlockTimestamp = event.block.timestamp;

  if (!tryBalanceOf.reverted) {
    accountMarket.balance = amountToDecimal(tryBalanceOf.value, CTokenDecimals);
    accountMarket.totalUnderlyingSupplied = accountMarket.balance.times(market.exchangeRate);
    accountMarket.totalUnderlyingSuppliedUSD = accountMarket.totalUnderlyingSupplied.times(market.underlyingPriceUSD);
  }

  if (!tryBorrowBalance.reverted) {
    accountMarket.totalUnderlyingBorrowed = amountToDecimal(tryBorrowBalance.value, market.underlyingDecimals);
    accountMarket.totalUnderlyingBorrowedUSD = accountMarket.totalUnderlyingBorrowed.times(market.underlyingPriceUSD);
  }
}
