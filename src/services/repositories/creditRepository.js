import CreditHistoryAPI from "../api/CreditHistoryAPI";

export const creditRepository = {
  async fetchAll(data) {
    const response = await CreditHistoryAPI.fetchAll(data);

    if (!response)
      return {
        message: "Failed to fetch credit history",
        type: "error",
      };

    return await response;
  },

  async fetchCredit(data) {
    const response = await CreditHistoryAPI.fetchCredit(data);

    if (!response)
      return {
        message: "Failed to fetch credit history",
        type: "error",
      };

    return await response;
  },

  async fetchPage({ page = 1, perPage = 8, ...params }) {
    const response = await CreditHistoryAPI.paginate(page, perPage, params);

    if (!response)
      return {
        message: "Failed to fetch credit history",
        type: "error",
      };

    return await response;
  },

  async fetchScore(params) {
    const response = await CreditHistoryAPI.score(params);

    if (!response)
      return {
        message: "Failed to fetch credit score",
        type: "error",
      };

    return await response;
  },

  async countCreditHistory(params) {
    const response = await CreditHistoryAPI.count(params);

    if (!response)
      return {
        message: "Failed to fetch results",
        type: "error",
      };

    return await response;
  },

  saveId(id) {
    localStorage.setItem("credit-id", id);
  },

  getId() {
    return localStorage.getItem("credit-id") || false;
  },

  clearId() {
    localStorage.removeItem("credit-id");
  },
};
