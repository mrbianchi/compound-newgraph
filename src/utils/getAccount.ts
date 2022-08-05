import { ethereum } from "@graphprotocol/graph-ts";
import { Account } from "../types/schema";
import { createAccount } from "./createAccount";

export function getAccount(accountId: string, event: ethereum.Event): Account {
  let account = Account.load(accountId);

  if (!account) {
    account = createAccount(accountId, event);
  }

  return account;
}
