import { ZeroBI } from "../constants";
import { Account } from "../types/schema";

export function createAccount(accountId: string): Account {
  const account = new Account(accountId);
  account.countLiquidated = ZeroBI;
  account.countLiquidator = ZeroBI;
  account.hasBorrowed = false;
  account.save();
  return account;
}
