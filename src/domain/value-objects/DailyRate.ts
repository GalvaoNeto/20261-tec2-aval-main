import { RequesterType } from "../enums/RequesterType.js";

export class DailyRate {
  private static readonly rates: Record<RequesterType, number> = {
    [RequesterType.STUDENT]: 9000,
    [RequesterType.EMPLOYEE]: 18000,
    [RequesterType.PROFESSOR]: 25000,
    [RequesterType.MANAGER]: 30000,
  };

  static getFor(requesterType: RequesterType): number {
    return this.rates[requesterType];
  }
}
