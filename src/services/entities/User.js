import { createSelector } from "@reduxjs/toolkit";

export class User {
  constructor({
    id,
    first_name,
    middle_name,
    last_name,
    email,
    role,
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
