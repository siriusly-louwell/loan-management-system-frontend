import { createSelector } from "@reduxjs/toolkit";

export class User {
  constructor({
    id,
    first_name,
    middle_name,
    last_name,
    email,
    role = "guest",
    contact,
    gender,
    status,
    pfp,
  }) {
    // if (!email) {
    //   throw new Error("Email is required");
    // }

    this.id = id;
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.email = email;
    this.role = role;
    this.contact = contact;
    this.gender = gender;
    this.status = status;
    this.pfp = pfp;
  }

  get fullName() {
    return `${this.first_name} ${this.last_name}`;
  }

  get roleName() {
    switch (this.role) {
      case "admin":
        return "Administrator";
      case "staff":
        return "Staff";
      case "ci":
        return "Credit Investigator";
      case "customer":
        return "Customer";
      default:
        return "Guest";
    }
  }

  get statusName() {
    return this.status.charAt(0).toUpperCase() + this.status.slice(1);
  }

  get genderType() {
    return this.gender.charAt(0).toUpperCase() + this.gender.slice(1);
  }

  imgURL() {
    return `${process.env.REACT_APP_API_URL}/storage/${this.pfp}`;
  }

  isAdmin() {
    return this.role === "admin";
  }

  isSameUser(otherUser) {
    return this.id === otherUser.id;
  }

  isAuthorized(requiredRole) {
    if (!this.id) return false;
    return this.role === requiredRole;
  }

  get getStatus() {
    if (this.status === "active") return { text: "Active", color: "green" };
    else return { text: "Inactive", color: "red" };
  }
}

// ? selector
const selectUserDto = (state) => state.auth.user;

export const UserEntity = createSelector([selectUserDto], (userDto) =>
  userDto ? new User(userDto) : null
);

export const UserEntities = createSelector(
  (state) => state.user.users || [],
  (users) => users.map((u) => new User(u))
);

// ? permission check
export function isAuthorized(user, requiredRole) {
  if (!user) return false;
  return user.role === requiredRole;
}
