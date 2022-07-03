import { log } from "@graphprotocol/graph-ts";
import { ContributorCompSpeedUpdated } from "../../types/Comptroller/Comptroller";

export function handleContributorCompSpeedUpdated(event: ContributorCompSpeedUpdated): void {
  log.info("ContributorCompSpeedUpdated event handled", []);
  log.info("param contributor: {}", [event.params.contributor.toString()]);
  log.info("param newSpeed: {}", [event.params.newSpeed.toString()]);
}
