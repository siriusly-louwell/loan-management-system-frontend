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

  async fetchPage({ token, page = 1, perPage = 8, ...params }) {
    const response = await UserAPI.paginate(token, page, perPage, params);

    if (!response) {
      return {
        message: "Failed to fetch users",
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

  statusBadge(status) {
    switch (status) {
      case "accepted":
        return { text: "Accepted", color: "green" };
      case "denied":
        return { text: "Denied", color: "orange" };
      case "evaluated":
        return { text: "Evaluated", color: "yellow" };
      case "approved":
        return { text: "Approved", color: "purple" };
      case "declined":
        return { text: "Declined", color: "red" };
      default:
        return { text: "Pending", color: "blue" };
    }
  },
};
