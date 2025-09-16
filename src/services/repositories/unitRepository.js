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
    const form = this.appendData({ ...data });
    const response = await UnitAPI.add(form);

    if (!response) {
      return {
        message: "Failed to create unit",
        type: "error",
      };
    }

    return await response;
  },

  async edit(data) {
    const form = this.appendData({ ...data }, "edit");
    const response = await UnitAPI.edit(form, data.id);

    if (!response) {
      return {
        message: "Failed to edit unit",
        type: "error",
      };
    }

    return await response;
  },

  appendData(data, type = "add") {
    const submitData = new FormData();
    const form = data.form;

    for (let key in form) {
      submitData.append(`${key}`, form[key]);
    }

    data.colors.forEach((color) => submitData.append("colors[]", color));
    data.files.forEach((obj) => {
      const file = type === "edit" ? obj.file : obj;
      submitData.append("files[]", file);
    });

    if (type === "edit") {
      submitData.append("_method", "PATCH");

      submitData.append(
        "fileStats",
        JSON.stringify(
          data.files
            .filter((obj) => obj.status !== "keep")
            .map((obj) => ({ id: obj.id, status: obj.status }))
        )
      );
    } else submitData.append(`quantity`, data.totalQuantity);

    return submitData;
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
