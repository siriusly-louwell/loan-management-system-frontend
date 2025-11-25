import { createSelector } from "@reduxjs/toolkit";
import {
  STATUS_GROUPS,
  STATUS_MAP,
  STATUS_TEXT,
} from "../../constants/loanStatus";

export class Loan {
  constructor({
    id,
    user_id,
    record_id,
    first_name,
    last_name,
    transactions = [],
    rate,
    bills,
    living_exp,
    education_exp,
    transportation,
    apply_status,
    yrs_in_service,
    amortization = 0.0,
    rent = 0.0,
    income,
    reject_reason,
    created_at,
  }) {
    this.id = id;
    this.record_id = record_id;
    this.user_id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.transactions = transactions;
    this.rate = rate;
    this.bills = bills;
    this.living_exp = living_exp;
    this.education_exp = education_exp;
    this.transportation = transportation;
    this.status = apply_status;
    this.yrs_in_service = yrs_in_service;
    this.amortization = amortization;
    this.rent = rent;
    this.income = income;
    this.reject_reason = reject_reason;
    this.created_at = created_at;
  }

  get fullName() {
    return `${this.first_name} ${this.last_name}`;
  }

  get getIncome() {
    return (
      this.income && this.income.charAt(0).toUpperCase() + this.income.slice(1)
    );
  }

  get getRate() {
    return `₱${parseFloat(this.rate).toLocaleString()}`;
  }

  get getAmortization() {
    return this.amortization
      ? `₱${parseFloat(this.amortization).toLocaleString()}`
      : "N/A";
  }

  get getAmortizationInt() {
    return this.amortization ?? 0;
  }

  get getRent() {
    return `₱${parseFloat(this.rent).toLocaleString()}`;
  }

  get downpayment() {
    return (
      this.transactions?.length > 0 &&
      `₱${parseFloat(this.transactions[0].downpayment).toLocaleString()}`
    );
  }

  get price() {
    return (
      this.transactions?.length > 0 &&
      `₱${parseFloat(this.transactions[0].motorcycle.price).toLocaleString()}`
    );
  }

  get initialBalance() {
    const balance =
      this.transactions?.length > 0 &&
      Number(this.transactions[0].motorcycle.price) -
        Number(this.transactions[0].downpayment);

    return `₱${parseFloat(balance).toLocaleString()}`;
  }

  get dateIssued() {
    if (!this.created_at) return "";
    const date = new Date(this.created_at);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  get emi() {
    if (!this.transactions) return 0;

    return this.transactions.reduce((sum, item) => {
      const tenure = item.tenure * 12;
      const loanAmount =
        parseFloat(item.motorcycle?.price || 0) -
        parseFloat(item.downpayment || 0);
      const monthlyRate = item.motorcycle.interest / 12 / 100;
      const emi =
        monthlyRate === 0
          ? loanAmount / tenure
          : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
            (Math.pow(1 + monthlyRate, tenure) - 1);

      return sum + Math.round(emi * 100) / 100;
    }, 0);
  }

  get ndi() {
    return (
      parseFloat(this.rate) -
      (parseFloat(this.rent) +
        parseFloat(this.amortization) +
        parseFloat(this.bills) +
        parseFloat(this.living_exp) +
        parseFloat(this.education_exp) +
        parseFloat(this.transportation))
    );
  }

  get dti() {
    return (
      ((parseFloat(this.rent) + parseFloat(this.amortization) + this.emi) /
        parseFloat(this.rate)) *
      100
    );
  }

  get unitImage() {
    return (
      this.transactions?.length &&
      `${process.env.REACT_APP_API_URL}/storage/${this.transactions[0].motorcycle.file_path}`
    );
  }

  trackStatus(stage) {
    const stageConfig = STATUS_MAP[stage];
    if (!stageConfig[this.status]) return stageConfig.default;

    return stageConfig[this.status] || stageConfig.default;
  }

  statusLabel(type, index) {
    const status =
      this.status === STATUS_GROUPS[type].negative
        ? STATUS_GROUPS[type].negative
        : STATUS_GROUPS[type].positive;

    return index === 0
      ? STATUS_TEXT[status].label
      : STATUS_TEXT[status].description;
  }

  get statusBadge() {
    return this.status === "denied"
      ? { label: "Failed", color: "red" }
      : this.status === "pending"
      ? { label: "Pending", color: "blue" }
      : this.status === "canceled"
      ? { label: "Canceled", color: "gray" }
      : { label: "Passed", color: "green" };
  }
}

// ? selector
const selectUserDto = (state) => state.application.loan;
export const LoanEntity = createSelector([selectUserDto], (userDto) =>
  userDto
    ? new Loan(userDto)
    : { birthDate: "", getAmortization: 0.0, getRent: 0.0 }
);
