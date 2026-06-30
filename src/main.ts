import { ProcessTravelRequestUseCase } from "./application/use-cases/ProcessTravelRequestUseCase.js";

// Tipos públicos (permanecem os mesmos)
export type RequesterType = "student" | "employee" | "professor" | "manager";
export type TravelRequestStatus = "approved" | "pending-review" | "rejected";

export type TravelRequestInput = {
  requestId: string;
  requesterName: string;
  requesterType: RequesterType;
  destination: string;
  departureDate: string;
  returnDate: string;
  reason: string;
  transportCostInCents: number;
};

export type TravelRequestOutput = {
  requestId: string;
  status: TravelRequestStatus;
  travelDays: number;
  dailyAmountInCents: number;
  subtotalInCents: number;
  totalAmountInCents: number;
  errors: string[];
  warnings: string[];
};

// NOVA IMPLEMENTAÇÃO (substitui o export do legado)
export function processTravelRequest(input: TravelRequestInput): TravelRequestOutput {
  const useCase = new ProcessTravelRequestUseCase();
  return useCase.execute(input);
}