import { Address, BigDecimal } from "@graphprotocol/graph-ts";

export * from "./networkAddresses";
export * from "./proposalStatuses";
export const DefaultComptrollerId = "Comptroller";
export const NullAddress = Address.zero();
export const NullAddressString = NullAddress.toHexString();
export const ZeroBD = BigDecimal.zero();
