import ApplicationAPI from "../api/ApplicationAPI";

export const applyRepository = {
  //   async fetchAll() {
  //     const response = await UnitAPI.fetchAll();

  //     if (!response) {
  //       return {
  //         message: "Failed to fetch units",
  //         type: "error",
  //       };
  //     }

  //     return await response;
  //   },

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

  appendData(data) {
    const submitData = new FormData();
    const form = data.applicant;

    for (let key in form) {
      submitData.append(`${key}`, form[key]);
    }

    submitData.append('transaction', JSON.stringify(data.unit));

    Object.entries(data.files).forEach(([key, file]) => {
      submitData.append(key, file);
    });

    return submitData;
  },
};
