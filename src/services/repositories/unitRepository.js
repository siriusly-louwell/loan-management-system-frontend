import UnitAPI from "../api/UnitAPI";

export const unitRepository = {
  async fetchAll() {
    const response = await UnitAPI.fetchAll();

    if (!response) {
      return {
        message: "Failed to fetch units",
        type: "error",
      };
    }

    return await response;
  },

  async fetchPage({ page = 1, perPage = 8, ...params }) {
    const response = await UnitAPI.paginate(page, perPage, params);

    if (!response) {
      return {
        message: "Failed to fetch units",
        type: "error",
      };
    }

    return await response;
  },

  async add(data) {
    const response = await UnitAPI.add(data);

    if (!response) {
      return {
        message: "Failed to create unit",
        type: "error",
      };
    }

    return await response;
  },

  async edit(data, id) {
    const response = await UnitAPI.edit(data, id);

    if (!response) {
      return {
        message: "Failed to edit unit",
        type: "error",
      };
    }

    return await response;
  },

  async patch(data, id) {
    const response = await UnitAPI.patch(data, id);

    if (!response) {
      return {
        message: "Failed to update unit",
        type: "error",
      };
    }

    return await response;
  },

  saveId(id) {
    localStorage.setItem("unit-id", id);
  },

  getId() {
    return localStorage.getItem("unit-id") || false;
  },

  clearId() {
    localStorage.removeItem("unit-id");
  },
};
