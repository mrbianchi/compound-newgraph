import { Account } from "../types/schema";
import { createAccount } from "./createAccount";

export function getAccount(accountId: string): Account {
  let account = Account.load(accountId);

  if (!account) {
    account = createAccount(accountId);
  }

  return account;
}
