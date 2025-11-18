import UserAPI from "../api/UserAPI";

export const authRepository = {
  async login(credentials) {
    const response = await UserAPI.login(credentials);

    if (!response) throw new Error("Login failed");

    if (response.type === "input") {
      return {
        message: response.errors.password[0],
        type: "warn",
      };
    }

    return await response;
  },

  // ? Login using token
  async tokenLogin(token) {
    const response = await UserAPI.fetchUser(token);

    if (!response) throw new Error("Invalid Token");
    return await response;
  },

  // ? Change password
  async changePassword(password) {
    const response = await UserAPI.changePass({
      ...password,
      _method: "PATCH",
      type: "password"
    });

    if (!response) throw new Error("Unable to save password");
    return await response;
  },

  saveToken(token) {
    localStorage.setItem("token", token);
  },

  getToken() {
    return localStorage.getItem("token") || false;
  },

  clearToken() {
    localStorage.removeItem("token");
  },

  generateRandomString(length = 12) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567891-_.";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
};
