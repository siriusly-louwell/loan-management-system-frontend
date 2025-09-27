import { createSelector } from "@reduxjs/toolkit";

export class EmploymentInfo {
  constructor({
    id,
    income,
    superior,
    employment_status,
    yrs_in_service,
    rate = 0.0,
    employer,
    salary = 0.0,
    business,
    living_exp = 0.0,
    rental_exp = 0.0,
    education_exp = 0.0,
    transportation = 0.0,
    insurance = 0.0,
    bills = 0.0,
  }) {
    this.id = id;
    this.income = income;
    this.superior = superior;
    this.employment_status = employment_status;
    this.yrs_in_service = yrs_in_service;
    this.rate = rate;
    this.employer = employer;
    this.salary = salary;
    this.business = business;
    this.living_exp = living_exp;
    this.rental_exp = rental_exp;
    this.education_exp = education_exp;
    this.transportation = transportation;
    this.insurance = insurance;
    this.bills = bills;
  }

  get getIncome() {
    return this.income
      ? this.income.charAt(0).toUpperCase() + this.income.slice(1)
      : "";
  }

  get getRate() {
    return `₱${this.rate}`;
  }

  get getSalary() {
    return `₱${this.salary}`;
  }

  get getLivingExp() {
    return `₱${this.living_exp}`;
  }

  get getRentalExp() {
    return `₱${this.rental_exp}`;
  }

  get getEducationExp() {
    return `₱${this.education_exp}`;
  }

  get getTransportation() {
    return `₱${this.transportation}`;
  }

  get getInsurance() {
    return `₱${this.insurance}`;
  }

  get getBills() {
    return `₱${this.bills}`;
  }
}

// ? selector
const selectUserDto = (state) => state.application.loan;
export const EmploymentEntity = createSelector([selectUserDto], (userDto) =>
  userDto ? new EmploymentInfo(userDto) : {}
);

export const EmploymentEntities = createSelector(
  (state) => state.application.applications || [],
  (applications) => applications.map((u) => new EmploymentInfo(u))
);
