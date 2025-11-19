import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const UnitAPI = {
  async fetchAll(data) {
    const response = await axios.get(`${API_URL}/api/motorcycle`, {
      params: { ...data },
    });
    return response.data;
  },

  async paginate(page, perPage, params) {
    const response = await axios.get(`${API_URL}/api/motorcycle`, {
      params: { page, per_page: perPage, ...params },
    });
    return response.data;
  },

  async fetchUnit(id) {
    const response = await axios.get(`${API_URL}/api/motorcycle/${id}`);
    return response.data;
  },

  async count(params) {
    const response = await axios.get(`${API_URL}/api/motorcycle/count`, {
      params: { ...params },
    });
    return response.data;
  },

  async add(data) {
    const response = await axios.post(`${API_URL}/api/motorcycle/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response.data;
  },

  async edit(data, id) {
    const response = await axios.post(`${API_URL}/api/motorcycle/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  async patch(data, id) {
    const response = await axios.post(
      `${API_URL}/api/motorcycle/${id}?_method=PATCH`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  imgPath(image) {
    return `${API_URL}/storage/${image}`;
  },
};

export default UnitAPI;
