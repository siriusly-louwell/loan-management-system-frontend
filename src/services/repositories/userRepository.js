import UserAPI from "../api/UserAPI";

export const userRepository = {
  async fetchAll() {
    const response = await UserAPI.fetchAll();

    if (!response) {
      return {
        message: "Failed to fetch users",
        type: "error",
      };
    }

    return await response;
  },

  async fetchPage({ page = 1, perPage = 8, ...params }) {
    const response = await UserAPI.paginate(page, perPage, params);

    if (!response) {
      return {
        message: "Failed to fetch users",
        type: "error",
      };
    }

    return await response;
  },

  async fetchAccount(id) {
    const response = await UserAPI.fetchAccount(id);

    if (!response) {
      return {
        message: "Failed to fetch account",
        type: "error",
      };
    }

    return await response;
  },

  async add(data) {
    const response = await UserAPI.add(data);

    if (!response) {
      return {
        message: "Failed to create user",
        type: "error",
      };
    }

    return await response;
  },

  dateConvert(date) {
    const newDate = new Date(date);
    const formatted = new Intl.DateTimeFormat("en-GB").format(newDate);

    return formatted;
  },
};
