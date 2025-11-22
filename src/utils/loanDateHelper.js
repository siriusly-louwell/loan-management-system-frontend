// utils/loanDateHelper.js
export class LoanDateHelper {
  constructor(loan) {
    this.loan = loan;
  }

  appliedDate() {
    if (!this.loan.applied_at) return null;

    const [day, month, year] = this.loan.applied_at.split("/");
    return new Date(`${year}-${month}-${day}`);
  }

  isToday() {
    const d = this.appliedDate();
    const today = new Date();
    return (
      d &&
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  }

  isThisWeek() {
    const d = this.appliedDate();
    if (!d) return false;

    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - ((today.getDay() + 6) % 7)); // Monday

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    return d >= start && d <= end;
  }

  isThisMonth() {
    const d = this.appliedDate();
    const today = new Date();
    return (
      d &&
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth()
    );
  }

  isThisYear() {
    const d = this.appliedDate();
    const today = new Date();
    return d && d.getFullYear() === today.getFullYear();
  }
}
