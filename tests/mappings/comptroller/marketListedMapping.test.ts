import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, createMockedFunction, describe, newMockEvent, test } from "matchstick-as";
import { cEtherAddress } from "../../../src/constants";
import { handleMarketListed } from "../../../src/mappings/comptroller/marketListedMapping";
import { MarketListed } from "../../../src/types/Comptroller/Comptroller";

describe("Comptroller ::: marketListedMapping tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should save the listed Ether market", () => {
    const cEtherContractAddress = Address.fromString(cEtherAddress);
    const event = changetype<MarketListed>(newMockEvent());
    event.parameters.push(new ethereum.EventParam("cToken", ethereum.Value.fromAddress(cEtherContractAddress)));

    createMockedFunction(cEtherContractAddress, "name", "name():(string)").returns([
      ethereum.Value.fromString("Delegated Ether"),
    ]);
    createMockedFunction(cEtherContractAddress, "symbol", "symbol():(string)").returns([ethereum.Value.fromString("dETH")]);
    createMockedFunction(cEtherContractAddress, "interestRateModel", "interestRateModel():(address)").returns([
      ethereum.Value.fromAddress(Address.fromString("0xfafafa0000000000000000000000000000000001")),
    ]);
    createMockedFunction(cEtherContractAddress, "reserveFactorMantissa", "reserveFactorMantissa():(uint256)").returns([
      ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(200000000000000000)),
    ]);

    assert.entityCount("Market", 0);

    handleMarketListed(event);

    assert.entityCount("Market", 1);
    assert.fieldEquals("Market", cEtherAddress, "name", "Delegated Ether");
    assert.fieldEquals("Market", cEtherAddress, "symbol", "dETH");
    assert.fieldEquals("Market", cEtherAddress, "underlyingName", "Ether");
    assert.fieldEquals("Market", cEtherAddress, "underlyingSymbol", "ETH");
    assert.fieldEquals("Market", cEtherAddress, "interestRateModelAddress", "0xfafafa0000000000000000000000000000000001");
    assert.fieldEquals("Market", cEtherAddress, "reserveFactor", "200000000000000000");
    assert.fieldEquals("Market", cEtherAddress, "underlyingDecimals", "18");
    assert.fieldEquals("Market", cEtherAddress, "underlyingPrice", "1");
    assert.fieldEquals("Market", cEtherAddress, "borrowRate", "0");
    assert.fieldEquals("Market", cEtherAddress, "cash", "0");
    assert.fieldEquals("Market", cEtherAddress, "collateralFactor", "0");
    assert.fieldEquals("Market", cEtherAddress, "exchangeRate", "0");
    assert.fieldEquals("Market", cEtherAddress, "interestRateModelAddress", "0xfafafa0000000000000000000000000000000001");
    assert.fieldEquals("Market", cEtherAddress, "numberOfBorrowers", "0");
    assert.fieldEquals("Market", cEtherAddress, "numberOfSuppliers", "0");
    assert.fieldEquals("Market", cEtherAddress, "reserves", "0");
    assert.fieldEquals("Market", cEtherAddress, "supplyRate", "0");
    assert.fieldEquals("Market", cEtherAddress, "totalBorrows", "0");
    assert.fieldEquals("Market", cEtherAddress, "totalSupply", "0");
    assert.fieldEquals("Market", cEtherAddress, "accrualBlockNumber", "0");
    assert.fieldEquals("Market", cEtherAddress, "blockTimestamp", "0");
    assert.fieldEquals("Market", cEtherAddress, "borrowIndex", "0");
    assert.fieldEquals("Market", cEtherAddress, "reserveFactor", "200000000000000000");
    assert.fieldEquals("Market", cEtherAddress, "underlyingPriceUSD", "0");
    assert.fieldEquals("Market", cEtherAddress, "underlyingAddress", "0x0000000000000000000000000000000000000000");
    assert.fieldEquals("Market", cEtherAddress, "underlyingDecimals", "18");
  });

  test("It should save the listed non-Ether market", () => {
    const tokenAddressString = "0xfafafa0000000000000000000000000000000009";
    const tokenAddress = Address.fromString(tokenAddressString);
    const underlyingTokenAddress = Address.fromString("0xfafafa0000000000000000000000000000000010");
    const event = changetype<MarketListed>(newMockEvent());
    event.parameters.push(new ethereum.EventParam("cToken", ethereum.Value.fromAddress(tokenAddress)));

    createMockedFunction(tokenAddress, "underlying", "underlying():(address)").returns([
      ethereum.Value.fromAddress(underlyingTokenAddress),
    ]);
    createMockedFunction(tokenAddress, "name", "name():(string)").returns([ethereum.Value.fromString("Delegated non-Ether")]);
    createMockedFunction(tokenAddress, "symbol", "symbol():(string)").returns([ethereum.Value.fromString("dNETH")]);
    createMockedFunction(tokenAddress, "interestRateModel", "interestRateModel():(address)").returns([
      ethereum.Value.fromAddress(Address.fromString("0xfafafa0000000000000000000000000000000011")),
    ]);
    createMockedFunction(tokenAddress, "reserveFactorMantissa", "reserveFactorMantissa():(uint256)").returns([
      ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(200000000000000000)),
    ]);

    createMockedFunction(underlyingTokenAddress, "name", "name():(string)").returns([ethereum.Value.fromString("non-Ether")]);
    createMockedFunction(underlyingTokenAddress, "symbol", "symbol():(string)").returns([ethereum.Value.fromString("NETH")]);
    createMockedFunction(underlyingTokenAddress, "decimals", "decimals():(uint8)").returns([ethereum.Value.fromI32(18)]);

    assert.entityCount("Market", 0);

    handleMarketListed(event);

    assert.entityCount("Market", 1);
    assert.fieldEquals("Market", tokenAddressString, "name", "Delegated non-Ether");
    assert.fieldEquals("Market", tokenAddressString, "symbol", "dNETH");
    assert.fieldEquals("Market", tokenAddressString, "underlyingName", "non-Ether");
    assert.fieldEquals("Market", tokenAddressString, "underlyingSymbol", "NETH");
    assert.fieldEquals("Market", tokenAddressString, "interestRateModelAddress", "0xfafafa0000000000000000000000000000000011");
    assert.fieldEquals("Market", tokenAddressString, "reserveFactor", "200000000000000000");
    assert.fieldEquals("Market", tokenAddressString, "underlyingDecimals", "18");
    assert.fieldEquals("Market", tokenAddressString, "borrowRate", "0");
    assert.fieldEquals("Market", tokenAddressString, "cash", "0");
    assert.fieldEquals("Market", tokenAddressString, "collateralFactor", "0");
    assert.fieldEquals("Market", tokenAddressString, "exchangeRate", "0");
    assert.fieldEquals("Market", tokenAddressString, "interestRateModelAddress", "0xfafafa0000000000000000000000000000000011");
    assert.fieldEquals("Market", tokenAddressString, "numberOfBorrowers", "0");
    assert.fieldEquals("Market", tokenAddressString, "numberOfSuppliers", "0");
    assert.fieldEquals("Market", tokenAddressString, "reserves", "0");
    assert.fieldEquals("Market", tokenAddressString, "supplyRate", "0");
    assert.fieldEquals("Market", tokenAddressString, "totalBorrows", "0");
    assert.fieldEquals("Market", tokenAddressString, "totalSupply", "0");
    assert.fieldEquals("Market", tokenAddressString, "underlyingPrice", "0");
    assert.fieldEquals("Market", tokenAddressString, "accrualBlockNumber", "0");
    assert.fieldEquals("Market", tokenAddressString, "blockTimestamp", "0");
    assert.fieldEquals("Market", tokenAddressString, "borrowIndex", "0");
    assert.fieldEquals("Market", tokenAddressString, "reserveFactor", "200000000000000000");
    assert.fieldEquals("Market", tokenAddressString, "underlyingPriceUSD", "0");
    assert.fieldEquals("Market", tokenAddressString, "underlyingAddress", "0xfafafa0000000000000000000000000000000010");
    assert.fieldEquals("Market", tokenAddressString, "underlyingDecimals", "18");
  });
});
