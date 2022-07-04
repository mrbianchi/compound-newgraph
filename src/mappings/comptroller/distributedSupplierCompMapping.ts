import { log } from "@graphprotocol/graph-ts";
import { DistributedSupplierComp } from "../../types/Comptroller/Comptroller";

export function handleDistributedSupplierComp(event: DistributedSupplierComp): void {
  log.info("DistributedSupplierComp event handled", []);
  log.info("param cToken: {}", [event.params.cToken.toHexString()]);
  log.info("param supplier: {}", [event.params.supplier.toHexString()]);
  log.info("param compDelta: {}", [event.params.compDelta.toString()]);
  log.info("param compSupplyIndex: {}", [event.params.compSupplyIndex.toString()]);
}
