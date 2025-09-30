import { createSelector } from "@reduxjs/toolkit";
export class Report {
  constructor({
    id,
    application_form_id,
    recommendation,
    remarks,
    first_unit,
    delivered,
    outlet,
  }) {
    this.id = id;
    this.application_form_id = application_form_id;
    this.recommendation = recommendation;
    this.remarks = remarks;
    this.first_unit = first_unit;
    this.delivered = delivered;
    this.outlet = outlet;
  }
  get getRecommendation() {
    return this.recommendation
      ? this.recommendation.charAt(0).toUpperCase() +
          this.recommendation.slice(1)
      : "";
  }

  get getDelivered() {
    return this.delivered
      ? this.delivered.charAt(0).toUpperCase() + this.delivered.slice(1)
      : "";
  }
}

// ? selector
const selectReportDto = (state) => state.report.report;
export const ReportEntity = createSelector([selectReportDto], (userDto) =>
  userDto ? new Report(userDto) : {}
);

export const ReportEntities = createSelector(
  (state) => state.report.reports || [],
  (reports) => reports.map((u) => new Report(u))
);
