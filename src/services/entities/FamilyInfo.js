import { createSelector } from "@reduxjs/toolkit";

export class FamilyInfo {
  constructor({
    id,
    spouse_name,
    b_date,
    spouse_work,
    childre_num,
    children_dep,
    school,
    father_first,
    father_middle,
    father_last,
    mother_first,
    mother_middle,
    mother_last,
  }) {
    this.id = id;
    this.spouse_name = spouse_name;
    this.b_date = b_date;
    this.spouse_work = spouse_work;
    this.childre_num = childre_num;
    this.children_dep = children_dep;
    this.school = school;
    this.father_first = father_first;
    this.father_middle = father_middle;
    this.father_last = father_last;
    this.mother_first = mother_first;
    this.mother_middle = mother_middle;
    this.mother_last = mother_last;
  }

  get birthDate() {
    if (!this.b_date) return "";
    const date = new Date(this.b_date);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

// ? selector
const selectUserDto = (state) => state.application.loan;
export const FamilyEntity = createSelector([selectUserDto], (userDto) =>
  userDto ? new FamilyInfo(userDto) : {}
);

export const FamilyEntites = createSelector(
  (state) => state.application.applications || [],
  (applications) => applications.map((u) => new FamilyInfo(u))
);
