import { createSelector } from "@reduxjs/toolkit";

export class ComakerInfo {
  constructor({
    id,
    first_name,
    middle_name,
    last_name,
    contact_num,
    facebook,
    email,
    birth_day,
    birth_place,
    gender,
    status,
    religion,
    tribe,
    educ_attain,
    citizenship,
    occupation,
    yrs_in_service,
    employment_status,
    employer,
    spouse_first,
    spouse_middle,
    spouse_last,
    sp_citizenship,
    sp_occupation,
    sp_yrs_in_service,
    sp_emp_status,
    sp_employer,
    sp_father_first,
    sp_father_middle,
    sp_father_last,
    sp_mother_first,
    sp_mother_middle,
    sp_mother_last,
    co_sketch,
    co_valid_id,
    co_id_pic,
    co_residence_proof
  }) {
    this.id = id;
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.contact_num = contact_num;
    this.facebook = facebook;
    this.email = email;
    this.birth_day = birth_day;
    this.birth_place = birth_place;
    this.gender = gender;
    this.status = status;
    this.religion = religion;
    this.tribe = tribe;
    this.educ_attain = educ_attain;
    this.citizenship = citizenship;
    this.occupation = occupation;
    this.yrs_in_service = yrs_in_service;
    this.employment_status = employment_status;
    this.employer = employer;
    this.spouse_first = spouse_first;
    this.spouse_middle = spouse_middle;
    this.spouse_last = spouse_last;
    this.sp_citizenship = sp_citizenship;
    this.sp_occupation = sp_occupation;
    this.sp_yrs_in_service = sp_yrs_in_service;
    this.sp_emp_status = sp_emp_status;
    this.sp_employer = sp_employer;
    this.sp_father_first = sp_father_first;
    this.sp_father_middle = sp_father_middle;
    this.sp_father_last = sp_father_last;
    this.sp_mother_first = sp_mother_first;
    this.sp_mother_middle = sp_mother_middle;
    this.sp_mother_last = sp_mother_last;
    this.co_sketch = co_sketch;
    this.co_valid_id = co_valid_id;
    this.co_id_pic = co_id_pic;
    this.co_residence_proof = co_residence_proof;
  }

  get fullName() {
    return `${this.first_name} ${this.middle_name} ${this.last_name}`;
  }

  get imgURL() {
    return `${process.env.REACT_APP_API_URL}/storage/${this.co_valid_id}`;
  }

  get sketch() {
    return `${process.env.REACT_APP_API_URL}/storage/${this.co_sketch}`;
  }
  get residenceImg() {
    return `${process.env.REACT_APP_API_URL}/storage/${this.co_residence_proof}`;
  }

  get birthDate() {
    if (!this.birth_day) return "";
    const date = new Date(this.birth_day);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  get getGender() {
    return this.gender
      ? this.gender.charAt(0).toUpperCase() + this.gender.slice(1)
      : "";
  }

  get getEducAttain() {
    return this.educ_attain
      ? this.educ_attain.charAt(0).toUpperCase() + this.educ_attain.slice(1)
      : "";
  }

  get getStatus() {
    return this.status
      ? this.status.charAt(0).toUpperCase() + this.status.slice(1)
      : "";
  }
}

// ? selector
const selectUserDto = (state) => state.application.loan.comaker;
export const ComakerEntity = createSelector([selectUserDto], (userDto) =>
  userDto ? new ComakerInfo(userDto) : {}
);

export const ComakerEntities = createSelector(
  (state) => state.application.applications || [],
  (applications) => applications.map((u) => new ComakerInfo(u))
);
