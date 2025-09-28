import { createSelector } from "@reduxjs/toolkit";

export class Application {
  constructor({
    id,
    record_id,
    first_name,
    middle_name,
    last_name,
    email,
    contact_num,
    gender,
    civil_stat,
    apply_status,
    educ_attain,
    residence,
    amortization = 0.0,
    rent = 0.0,
    sss,
    tin,
    birth_day,
    birth_place,
    comm_standing,
    home_description,
    id_pic,
    valid_id,
    residence_proof,
    address = [],
  }) {
    this.id = id;
    this.record_id = record_id;
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.email = email;
    this.contact_num = contact_num;
    this.gender = gender;
    this.status = civil_stat;
    this.apply_status = apply_status;
    this.educ_attain = educ_attain;
    this.residence = residence;
    this.amortization = amortization;
    this.rent = rent;
    this.sss = sss;
    this.tin = tin;
    this.birth_day = birth_day;
    this.birth_place = birth_place;
    this.comm_standing = comm_standing;
    this.home_description = home_description;
    this.address = address;
    this.pfp = id_pic;
    this.valid_id = valid_id;
    this.residence_proof = residence_proof;
  }

  get fullName() {
    return `${this.first_name} ${this.last_name}`;
  }

  imgURL() {
    return `${process.env.REACT_APP_API_URL}/storage/${this.pfp}`;
  }

  validID() {
    return `${process.env.REACT_APP_API_URL}/storage/${this.valid_id}`;
  }
  residenceImg() {
    return `${process.env.REACT_APP_API_URL}/storage/${this.residence_proof}`;
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

  get getAmortization() {
    return `₱${this.amortization}`;
  }

  get getRent() {
    return `₱${this.rent}`;
  }

  get getResidence() {
    return this.residence
      ? this.residence.charAt(0).toUpperCase() + this.residence.slice(1)
      : "";
  }

  get getEducAttain() {
    return this.educ_attain
      ? this.educ_attain.charAt(0).toUpperCase() + this.educ_attain.slice(1)
      : "";
  }

  get getStatus() {
    return this.apply_status
      ? this.apply_status.charAt(0).toUpperCase() + this.apply_status.slice(1)
      : "";
  }

  get getGender() {
    return this.gender
      ? this.gender.charAt(0).toUpperCase() + this.gender.slice(1)
      : "";
  }

  imgURL() {
    return `${process.env.REACT_APP_API_URL}/storage/${this.pfp}`;
  }
}

// ? selector
const selectUserDto = (state) => state.application.loan;
export const ApplicationEntity = createSelector([selectUserDto], (userDto) =>
  userDto
    ? new Application(userDto)
    : { birthDate: "", getAmortization: 0.0, getRent: 0.0 }
);

export const ApplicationEntities = createSelector(
  (state) => state.user.users || [],
  (users) => users.map((u) => new Application(u))
);

// ? permission check
export function isAuthorized(user, requiredRole) {
  if (!user) return false;
  return user.role === requiredRole;
}
