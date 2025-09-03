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

  saveToken(token) {
    localStorage.setItem("token", token);
  },

  getToken() {
    return localStorage.getItem("token") || false;
  },

  clearToken() {
    localStorage.removeItem("token");
  },
};
