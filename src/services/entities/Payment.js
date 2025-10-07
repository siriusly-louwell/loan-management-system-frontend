import { createSelector } from "@reduxjs/toolkit";
export class Payment {
  constructor({
    id,
    application_form_id,
    application,
    amount_paid,
    cert_num,
    prev_balance,
    curr_balance,
    status,
    created_at,
  }) {
    this.id = id;
    this.application_form_id = application_form_id;
    this.application = application;
    this.amount_paid = amount_paid;
    this.cert_num = cert_num;
    this.prev_balance = prev_balance;
    this.curr_balance = curr_balance;
    this.status = status;
    this.created_at = created_at;
  }

  get amount() {
    return `₱${parseFloat(this.amount_paid).toLocaleString()}`;
  }

  get prevBalance() {
    return `₱${parseFloat(this.prev_balance).toLocaleString()}`;
  }

  get currBalance() {
    return `₱${parseFloat(this.curr_balance).toLocaleString()}`;
  }

  get date() {
    const date = new Date(this.created_at);

    return (
      date.getFullYear() +
      "." +
      String(date.getMonth() + 1).padStart(2, "0") +
      "." +
      String(date.getDate()).padStart(2, "0")
    );
  }
}

// ? selector
const selectReportDto = (state) => state.payment.payment;
export const PaymentEntity = createSelector([selectReportDto], (userDto) =>
  userDto ? new Payment(userDto) : {}
);

export const PaymentEntities = createSelector(
  (state) => state.payment.payments || [],
  (payments) => payments.map((u) => new Payment(u))
);
