export class User {
  constructor({ id, name, email, role, pfp }) {
    if (!email) {
      throw new Error("Email is required");
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.pfp = pfp;
  }

  isAdmin() {
    return this.role === "admin";
  }

  isSameUser(otherUser) {
    return this.id === otherUser.id;
  }
}
