import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, createMockedFunction, describe, newMockEvent, test } from "matchstick-as";
import { NativeTokenDecimals, NativeTokenName, NativeTokenSymbol, cNativeAddress } from "../../../src/constants";
import { handleMarketListed } from "../../../src/mappings/comptroller/marketListedMapping";
import { MarketListed } from "../../../src/types/Comptroller/Comptroller";

describe("Comptroller ::: marketListedMapping tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should save the listed Native market", () => {
    const cNativeContractAddress = Address.fromString(cNativeAddress);
    const event = changetype<MarketListed>(newMockEvent());
    event.parameters.push(new ethereum.EventParam("cToken", ethereum.Value.fromAddress(cNativeContractAddress)));

    createMockedFunction(cNativeContractAddress, "name", "name():(string)").returns([
      ethereum.Value.fromString("Delegated Native"),
    ]);
    createMockedFunction(cNativeContractAddress, "symbol", "symbol():(string)").returns([ethereum.Value.fromString("dNative")]);
    createMockedFunction(cNativeContractAddress, "interestRateModel", "interestRateModel():(address)").returns([
      ethereum.Value.fromAddress(Address.fromString("0xfafafa0000000000000000000000000000000001")),
    ]);
    createMockedFunction(cNativeContractAddress, "reserveFactorMantissa", "reserveFactorMantissa():(uint256)").returns([
      ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(200000000000000000)),
    ]);

    assert.entityCount("Market", 0);

    handleMarketListed(event);

    assert.entityCount("Market", 1);
    assert.fieldEquals("Market", cNativeAddress, "name", "Delegated Native");
    assert.fieldEquals("Market", cNativeAddress, "symbol", "dNative");
    assert.fieldEquals("Market", cNativeAddress, "underlyingName", NativeTokenName);
    assert.fieldEquals("Market", cNativeAddress, "underlyingSymbol", NativeTokenSymbol);
    assert.fieldEquals("Market", cNativeAddress, "interestRateModelAddress", "0xfafafa0000000000000000000000000000000001");
    assert.fieldEquals("Market", cNativeAddress, "reserveFactor", "200000000000000000");
    assert.fieldEquals("Market", cNativeAddress, "underlyingDecimals", NativeTokenDecimals.toString());
    assert.fieldEquals("Market", cNativeAddress, "underlyingPriceNative", "1");
    assert.fieldEquals("Market", cNativeAddress, "borrowRate", "0");
    assert.fieldEquals("Market", cNativeAddress, "cash", "0");
    assert.fieldEquals("Market", cNativeAddress, "collateralFactor", "0");
    assert.fieldEquals("Market", cNativeAddress, "exchangeRate", "0");
    assert.fieldEquals("Market", cNativeAddress, "interestRateModelAddress", "0xfafafa0000000000000000000000000000000001");
    assert.fieldEquals("Market", cNativeAddress, "numberOfBorrowers", "0");
    assert.fieldEquals("Market", cNativeAddress, "numberOfSuppliers", "0");
    assert.fieldEquals("Market", cNativeAddress, "reserves", "0");
    assert.fieldEquals("Market", cNativeAddress, "supplyRate", "0");
    assert.fieldEquals("Market", cNativeAddress, "totalBorrows", "0");
    assert.fieldEquals("Market", cNativeAddress, "totalSupply", "0");
    assert.fieldEquals("Market", cNativeAddress, "accrualBlockNumber", "0");
    assert.fieldEquals("Market", cNativeAddress, "blockTimestamp", "0");
    assert.fieldEquals("Market", cNativeAddress, "borrowIndex", "0");
    assert.fieldEquals("Market", cNativeAddress, "reserveFactor", "200000000000000000");
    assert.fieldEquals("Market", cNativeAddress, "underlyingPriceUSD", "0");
    assert.fieldEquals("Market", cNativeAddress, "underlyingAddress", "0x0000000000000000000000000000000000000000");
    assert.fieldEquals("Market", cNativeAddress, "underlyingDecimals", "18");
  });

  test("It should save the listed non-Native market", () => {
    const tokenAddressString = "0xfafafa0000000000000000000000000000000009";
    const tokenAddress = Address.fromString(tokenAddressString);
    const underlyingTokenAddress = Address.fromString("0xfafafa0000000000000000000000000000000010");
    const event = changetype<MarketListed>(newMockEvent());
    event.parameters.push(new ethereum.EventParam("cToken", ethereum.Value.fromAddress(tokenAddress)));

    createMockedFunction(tokenAddress, "underlying", "underlying():(address)").returns([
      ethereum.Value.fromAddress(underlyingTokenAddress),
    ]);
    createMockedFunction(tokenAddress, "name", "name():(string)").returns([ethereum.Value.fromString("Delegated non-Native")]);
    createMockedFunction(tokenAddress, "symbol", "symbol():(string)").returns([ethereum.Value.fromString("dNNative")]);
    createMockedFunction(tokenAddress, "interestRateModel", "interestRateModel():(address)").returns([
      ethereum.Value.fromAddress(Address.fromString("0xfafafa0000000000000000000000000000000011")),
    ]);
    createMockedFunction(tokenAddress, "reserveFactorMantissa", "reserveFactorMantissa():(uint256)").returns([
      ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(200000000000000000)),
    ]);

    createMockedFunction(underlyingTokenAddress, "name", "name():(string)").returns([ethereum.Value.fromString("non-Native")]);
    createMockedFunction(underlyingTokenAddress, "symbol", "symbol():(string)").returns([ethereum.Value.fromString("NNative")]);
    createMockedFunction(underlyingTokenAddress, "decimals", "decimals():(uint8)").returns([ethereum.Value.fromI32(18)]);

    assert.entityCount("Market", 0);

    handleMarketListed(event);

    assert.entityCount("Market", 1);
    assert.fieldEquals("Market", tokenAddressString, "name", "Delegated non-Native");
    assert.fieldEquals("Market", tokenAddressString, "symbol", "dNNative");
    assert.fieldEquals("Market", tokenAddressString, "underlyingName", "non-Native");
    assert.fieldEquals("Market", tokenAddressString, "underlyingSymbol", "NNative");
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
    assert.fieldEquals("Market", tokenAddressString, "underlyingPriceNative", "0");
    assert.fieldEquals("Market", tokenAddressString, "accrualBlockNumber", "0");
    assert.fieldEquals("Market", tokenAddressString, "blockTimestamp", "0");
    assert.fieldEquals("Market", tokenAddressString, "borrowIndex", "0");
    assert.fieldEquals("Market", tokenAddressString, "reserveFactor", "200000000000000000");
    assert.fieldEquals("Market", tokenAddressString, "underlyingPriceUSD", "0");
    assert.fieldEquals("Market", tokenAddressString, "underlyingAddress", "0xfafafa0000000000000000000000000000000010");
    assert.fieldEquals("Market", tokenAddressString, "underlyingDecimals", "18");
  });
});
