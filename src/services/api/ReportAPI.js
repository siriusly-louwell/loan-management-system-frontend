import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ReportAPI = {
  async fetchAll() {
    const response = await axios.get(`${API_URL}/api/report`);
    return response.data;
  },

  async paginate(page, perPage, params) {
    const response = await axios.get(`${API_URL}/api/report`, {
      params: { page, per_page: perPage, ...params },
    });
    return response.data;
  },

  async fetchReport({ id, ...params }) {
    const response = await axios.get(`${API_URL}/api/report/${id}`, {
      params: { ...params },
    });
    return response.data;
  },

  async report(data) {
    const response = await axios.post(`${API_URL}/api/report`, data);
    return response.data;
  },

  async patch(data, id) {
    const response = await axios.patch(
      `${API_URL}/api/application/${id}`,
      data
    );
    return response.data;
  },

  imgPath(image) {
    return `${API_URL}/storage/${image}`;
  },
};

export default ReportAPI;
