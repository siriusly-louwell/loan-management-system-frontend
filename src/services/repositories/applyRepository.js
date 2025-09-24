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
