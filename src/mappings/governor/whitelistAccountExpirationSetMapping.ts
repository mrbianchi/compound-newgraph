import { log } from "@graphprotocol/graph-ts";
import { WhitelistAccountExpirationSet } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";

export function handleWhitelistAccountExpirationSet(event: WhitelistAccountExpirationSet): void {
  log.info("WhitelistAccountExpirationSet event handled", []);
  log.info("param account: {}", [event.params.account.toHexString()]);
  log.info("param expiration: {}", [event.params.expiration.toString()]);
}
