import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const UserAPI = {
  async fetchAll() {
    const response = await axios.get(`${API_URL}/api/account`);
    return response.data;
  },

  async paginate(page, perPage, params) {
    const response = await axios.get(`${API_URL}/api/account`, {
      // headers: token ? { Authorization: `Bearer ${token}` } : {},
      params: { page, per_page: perPage, ...params },
    });
    return response.data;
  },

  async fetchUser(token) {
    const response = await axios.get(`${API_URL}/api/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async add(data) {
    const response = await axios.post(`${API_URL}/api/account/`, data);

    return response.data;
  },

  async login(credentials) {
    const response = await axios.post(`${API_URL}/api/login`, credentials);
    return response.data;
  },

  async register(data) {
    const response = await axios.post(`${API_URL}/api/account`, data);
    return response.data;
  },

  imgPath(image) {
    return `${API_URL}/storage/${image}`;
  },
};

export default UserAPI;
