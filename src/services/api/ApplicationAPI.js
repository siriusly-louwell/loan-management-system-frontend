import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ApplicationAPI = {
  async fetchAll() {
    const response = await axios.get(`${API_URL}/api/application`);
    return response.data;
  },

  async paginate(page, perPage, params) {
    const response = await axios.get(`${API_URL}/api/application`, {
      params: { page, per_page: perPage, ...params },
    });
    return response.data;
  },

  async fetchApplication({ id, ...params }) {
    const response = await axios.get(`${API_URL}/api/application/${id}`, {
      params: { ...params },
    });
    return response.data;
  },

  async count(params) {
    const response = await axios.get(`${API_URL}/api/application/count`, {
      params: { ...params },
    });
    return response.data;
  },

  async apply(data) {
    const response = await axios.post(`${API_URL}/api/application`, data);
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

export default ApplicationAPI;
