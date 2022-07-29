import { DefaultComptrollerId, NullAddress, ZeroBD, ZeroBI } from "../constants";
import { Comptroller } from "../types/schema";

export function createComptroller(): Comptroller {
  const comptroller = new Comptroller(DefaultComptrollerId);
  comptroller.priceOracleAddress = NullAddress;
  comptroller.closeFactor = ZeroBD;
  comptroller.liquidationIncentive = ZeroBD;
  comptroller.transfersPaused = false;
  comptroller.seizesPaused = false;
  comptroller.latestBlockNumber = ZeroBI;
  comptroller.latestBlockTimestamp = ZeroBI;
  comptroller.totalSupplyUSD = ZeroBD;
  comptroller.totalBorrowUSD = ZeroBD;
  comptroller.totalReservesUSD = ZeroBD;
  comptroller.utilization = ZeroBD;
  comptroller.markets = [];
  comptroller.save();
  return comptroller;
}
