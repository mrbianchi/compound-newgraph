import { log } from "@graphprotocol/graph-ts";
import { WhitelistGuardianSet } from "../../types/GovernorBravoDelegator/GovernorBravoDelegator";

export function handleWhitelistGuardianSet(event: WhitelistGuardianSet): void {
  log.info("WhitelistGuardianSet event handled", []);
  log.info("param oldGuardian: {}", [event.params.oldGuardian.toHexString()]);
  log.info("param newGuardian: {}", [event.params.newGuardian.toHexString()]);
}
