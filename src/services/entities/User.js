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
    if (!email) {
      throw new Error("Email is required");
    }

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

  isAdmin() {
    return this.role === "admin";
  }

  isSameUser(otherUser) {
    return this.id === otherUser.id;
  }
}
