import type { TravelRequestInput, TravelRequestOutput } from "../../main.js";
import { DailyRate } from "../../domain/value-objects/DailyRate.js";
import { DateRange } from "../../domain/value-objects/DateRange.js";
import { TravelRequestValidator } from "../../domain/validators/TravelRequestValidator.js";
import { StatusRules } from "../../domain/rules/StatusRules.js";
import { RequesterType } from "../../domain/enums/RequesterType.js";

export class ProcessTravelRequestUseCase {
    execute(input: TravelRequestInput): TravelRequestOutput {
        const errors = TravelRequestValidator.validate(input);
    
        let travelDays = 0;
        let dailyAmount = 0;
        let subtotal = 0;
        let total = 0;
    
        if (errors.length === 0 && input.departureDate && input.returnDate) {
        try {
            const dateRange = new DateRange(input.departureDate, input.returnDate);
            travelDays = dateRange.getDays();
            dailyAmount = DailyRate.getFor(input.requesterType as RequesterType);
            subtotal = travelDays * dailyAmount;
            total = subtotal + input.transportCostInCents;
        } catch {
            // Errors already captured by validator
        }
        }
    
        const hasErrors = errors.length > 0;
        const { status, warnings } = StatusRules.determine(
            hasErrors,
            travelDays,
            total,
            input.reason,
        );
    
        return {
            requestId: input.requestId,
            status,
            travelDays,
            dailyAmountInCents: dailyAmount,
            subtotalInCents: subtotal,
            totalAmountInCents: total,
            errors,
            warnings,
        };
    }
}
