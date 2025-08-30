import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const UserAPI = {
  async fetchUser(token) {
    const response = await axios.get(`${API_URL}/api/account`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
};

export default UserAPI;