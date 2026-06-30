import type { TravelRequestInput } from "../../main.js";

export class TravelRequestValidator {
  static validate(input: TravelRequestInput): string[] {
    const errors: string[] = [];
    
    this.validateRequired(input.requestId, "requestId", errors);
    this.validateRequired(input.requesterName, "requesterName", errors);
    this.validateRequired(input.requesterType, "requesterType", errors);
    this.validateRequired(input.destination, "destination", errors);
    this.validateRequired(input.departureDate, "departureDate", errors);
    this.validateRequired(input.returnDate, "returnDate", errors);
    
    if (input.departureDate) {
      this.validateDate(input.departureDate, "departureDate", errors);
    }
    if (input.returnDate) {
      this.validateDate(input.returnDate, "returnDate", errors);
    }
    
    if (input.departureDate && input.returnDate && 
        this.isValidDate(input.departureDate) && 
        this.isValidDate(input.returnDate)) {
      this.validateOrder(input.departureDate, input.returnDate, errors);
    }
    
    return errors;
  }

  private static validateRequired(value: any, field: string, errors: string[]): void {
    if (!value) {
      errors.push(`${field} is required`);
    }
  }

  private static validateDate(value: string, field: string, errors: string[]): void {
    if (!this.isValidDate(value)) {
      errors.push(`${field} must be a valid YYYY-MM-DD date`);
    }
  }

  private static isValidDate(value: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    
    return date.getUTCFullYear() === year &&
            date.getUTCMonth() === month - 1 &&
            date.getUTCDate() === day;
  }

  private static validateOrder(departure: string, returnDate: string, errors: string[]): void {
    const [depYear, depMonth, depDay] = departure.split("-").map(Number);
    const [retYear, retMonth, retDay] = returnDate.split("-").map(Number);
    const dep = Date.UTC(depYear, depMonth - 1, depDay);
    const ret = Date.UTC(retYear, retMonth - 1, retDay);
    
    if (ret < dep) {
      errors.push("returnDate cannot be before departureDate");
    }
  }
}