import UnitAPI from "../api/UnitAPI";

export const unitRepository = {
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

  appendData(submitData, data) {
    const form = data.formData;

    for (let key in form) {
      submitData.append(`${key}`, form[key]);
    }

    submitData.append(`quantity`, data.totalQuantity);
    data.colors.forEach((color) => submitData.append("colors[]", color));
    data.files.map((arr) => {
      arr.forEach((file) => submitData.append("files[]", file));
    });

    return submitData;
  }
};
