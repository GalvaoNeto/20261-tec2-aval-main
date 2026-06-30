export class DateRange {
  private readonly departureDate: Date;
  private readonly returnDate: Date;

  constructor(departure: string, returnDate: string) {
    this.departureDate = this.parseDate(departure, "departureDate");
    this.returnDate = this.parseDate(returnDate, "returnDate");
    this.validateOrder();
  }

  private parseDate(value: string, fieldName: string): Date {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      throw new Error(`${fieldName} must be a valid YYYY-MM-DD date`);
    }

    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    if (date.getUTCFullYear() !== year || 
        date.getUTCMonth() !== month - 1 || 
        date.getUTCDate() !== day) {
      throw new Error(`${fieldName} must be a valid YYYY-MM-DD date`);
    }

    return date;
  }

  private validateOrder(): void {
    if (this.returnDate.getTime() < this.departureDate.getTime()) {
      throw new Error("returnDate cannot be before departureDate");
    }
  }

  getDays(): number {
    const diffInMs = this.returnDate.getTime() - this.departureDate.getTime();
    return Math.floor(diffInMs / 86400000) + 1;
  }
}