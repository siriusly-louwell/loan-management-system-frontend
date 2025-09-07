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
    const form = unitRepository.appendData({ ...data });
    const response = await UnitAPI.add(form);

    if (!response) {
      return {
        message: "Failed to create unit",
        type: "error",
      };
    }

    return await response;
  },

  appendData(data) {
    const submitData = new FormData();
    const form = data.formData;

    for (let key in form) {
      submitData.append(`${key}`, form[key]);
    }

    submitData.append(`quantity`, data.totalQuantity);
    data.colors.forEach((color) => submitData.append("colors[]", color));
    data.files.forEach((arr) => {
      arr.forEach((file) => submitData.append("files[]", file));
    });

    return submitData;
  },

  saveId(id) {
    localStorage.setItem("unit-id", id);
  },

  getId() {
    return localStorage.getItem("unit-id") || false;
  },

  clearId() {
    localStorage.removeItem("token");
  },
};
