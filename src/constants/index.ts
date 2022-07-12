import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { exponentToBigDecimal } from "../utils";

export * from "./networkAddresses";
export * from "./proposalStatuses";
export const CTokenDecimals = 8;
export const CTokenDecimalsBD: BigDecimal = exponentToBigDecimal(8);
export const DefaultComptrollerId = "Comptroller";
export const MantissaFactor = 18;
export const MantissaFactorBD = exponentToBigDecimal(18);
export const NullAddress = Address.zero();
export const NullAddressString = NullAddress.toHexString();
export const ZeroBI = BigInt.zero();
export const ZeroBD = BigDecimal.zero();
