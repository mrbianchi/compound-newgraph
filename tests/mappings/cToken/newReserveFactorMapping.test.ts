import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, createMockedFunction, describe, newMockEvent, test } from "matchstick-as";
import { handleNewReserveFactor } from "../../../src/mappings/cToken/newReserveFactorMapping";
import { NewReserveFactor } from "../../../src/types/templates/CToken/CToken";

function createEvent(oldReserveFactorMantissa: u64, newReserveFactorMantissa: u64): NewReserveFactor {
  const event = changetype<NewReserveFactor>(newMockEvent());
  const oldReserveFactorMantissaParam = new ethereum.EventParam(
    "oldReserveFactorMantissa",
    ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(oldReserveFactorMantissa))
  );
  const newReserveFactorMantissaParam = new ethereum.EventParam(
    "newPriceOracle",
    ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(newReserveFactorMantissa))
  );

  event.parameters = [];
  event.parameters.push(oldReserveFactorMantissaParam);
  event.parameters.push(newReserveFactorMantissaParam);
  return event;
}

describe("cToken ::: handleNewReserveFactor tests", () => {
  beforeEach(() => {
    clearStore();
  });

  test("It should log an error if the market doesn't exist", () => {
    const tokenAddress = Address.fromString("0xa16081f360e3847006db660bae1c6d1b2e17ec2a");
    const underlyingTokenAddress = Address.fromString("0xfafafa0000000000000000000000000000000010");
    const event = createEvent(0, 1);
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

    handleNewReserveFactor(event);

    assert.entityCount("Market", 1);
    assert.fieldEquals("Market", "0xa16081f360e3847006db660bae1c6d1b2e17ec2a", "reserveFactor", "1");
  });
});
