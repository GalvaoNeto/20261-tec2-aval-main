import type { TravelRequestStatus } from "../../main.js";

export class StatusRules {
  static determine(
    hasErrors: boolean,
    travelDays: number,
    totalAmountInCents: number,
    reason: string,
  ): { status: TravelRequestStatus; warnings: string[] } {
    if (hasErrors) {
      return { status: "rejected", warnings: [] };
    }
    
    const warnings: string[] = [];
    
    if (travelDays > 5 && reason.length < 30) {
      warnings.push("long travel requests should include a detailed reason");
    }
    
    if (travelDays > 5 || totalAmountInCents > 200000) {
      return { status: "pending-review", warnings };
    }
    
    return { status: "approved", warnings };
  }
}
