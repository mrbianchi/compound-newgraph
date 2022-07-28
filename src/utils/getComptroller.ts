import { DefaultComptrollerId, NullAddress, ZeroBD, ZeroBI } from "../constants";
import { Comptroller } from "../types/schema";

export function getComptroller(): Comptroller {
  let comptroller = Comptroller.load(DefaultComptrollerId);

  if (!comptroller) {
    comptroller = new Comptroller(DefaultComptrollerId);
    comptroller.priceOracleAddress = NullAddress;
    comptroller.closeFactorMantissa = ZeroBI;
    comptroller.liquidationIncentiveMantissa = ZeroBI;
    comptroller.transfersPaused = false;
    comptroller.seizesPaused = false;
    comptroller.totalSupplyUSD = ZeroBD;
    comptroller.totalBorrowUSD = ZeroBD;
    comptroller.totalReservesUSD = ZeroBD;
    comptroller.utilization = ZeroBD;
    comptroller.markets = [];
    comptroller.save();
  }

  return comptroller;
}
