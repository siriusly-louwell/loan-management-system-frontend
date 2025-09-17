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
