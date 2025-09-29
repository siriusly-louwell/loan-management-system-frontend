import ApplicationAPI from "../api/ApplicationAPI";

export const applyRepository = {
  async fetchAll() {
    const response = await ApplicationAPI.fetchAll();

    if (!response) {
      return {
        message: "Failed to fetch applications",
        type: "error",
      };
    }

    return await response;
  },

  async fetchApplication(data) {
    const response = await ApplicationAPI.fetchApplication(data);

    if (!response) {
      return {
        message: "Failed to fetch application",
        type: "error",
      };
    }

    return await response;
  },

  async fetchPage({ page = 1, perPage = 8, ...params }) {
    const response = await ApplicationAPI.paginate(page, perPage, params);

    if (!response) {
      return {
        message: "Failed to fetch applications",
        type: "error",
      };
    }

    return await response;
  },

  async apply(data) {
    const form = this.appendData(data);
    const response = await ApplicationAPI.apply(form);

    if (!response) {
      return {
        message: "Failed to submit application",
        type: "error",
      };
    }

    return await response;
  },

  async patch(data, id) {
    const response = await ApplicationAPI.patch(data, id);

    if (!response) {
      return {
        message: "Failed to accept loan",
        type: "error",
      };
    }

    return await response;
  },

  appendData(data) {
    const submitData = new FormData();
    const form = data.applicant;

    for (let key in form) {
      submitData.append(`${key}`, form[key]);
    }

    submitData.append("transaction", JSON.stringify(data.unit));

    Object.entries(data.files).forEach(([key, file]) => {
      submitData.append(key, file);
    });

    return submitData;
  },

  dateConvert(date) {
    const newDate = new Date(date);
    const formatted = new Intl.DateTimeFormat("en-GB").format(newDate);

    return formatted;
  },

  fullName(first, last) {
    return `${first} ${last}`;
  },

  isThisWeek(created_at) {
    const date = new Date(created_at);
    const now = new Date();
    const start = new Date();

    now.setHours(23, 59, 59, 999);
    start.setDate(now.getDate() - 2);
    start.setHours(0, 0, 0, 0);

    return date >= start && date <= now;
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

  saveId(id) {
    localStorage.setItem("loan-id", id);
  },

  getId() {
    return localStorage.getItem("loan-id") || false;
  },

  clearId() {
    localStorage.removeItem("loan-id");
  },
};
