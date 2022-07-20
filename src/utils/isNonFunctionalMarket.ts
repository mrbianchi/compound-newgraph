import { cMkrAddress, cSaiAddress } from "../constants";

export function isNonFunctionalMarket(marketId: string): bool {
  if (marketId == cSaiAddress) {
    return true;
  }

  if (marketId == cMkrAddress) {
    return true;
  }

  return false;
}
