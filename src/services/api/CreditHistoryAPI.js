import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const CreditHistoryAPI = {
  async fetchAll() {
    const response = await axios.get(`${API_URL}/api/credit`);
    return response.data;
  },

  async paginate(page, perPage, params) {
    const response = await axios.get(`${API_URL}/api/credit`, {
      params: { page, per_page: perPage, ...params },
    });
    return response.data;
  },

  async fetchCredit({ id, ...params }) {
    const response = await axios.get(`${API_URL}/api/credit/${id}`, {
      params: { ...params },
    });
    return response.data;
  },

  async score(params) {
    const response = await axios.get(`${API_URL}/api/credit/score`, {
      params: { ...params },
    });
    return response.data;
  },

  async count(params) {
    const response = await axios.get(`${API_URL}/api/credit/count`, {
      params: { ...params },
    });
    return response.data;
  },

  async patch(data, id) {
    const response = await axios.patch(
      `${API_URL}/api/credit/${id}`,
      data
    );
    return response.data;
  },
};

export default CreditHistoryAPI;
