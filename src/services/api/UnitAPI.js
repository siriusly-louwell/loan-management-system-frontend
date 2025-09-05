import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const UserAPI = {
  async fetchAll() {
    const response = await axios.get(`${API_URL}/api/motorcycle`);
    return response.data;
  },

  async add(data) {
    const response = await axios.post(`${API_URL}/api/motorcycle`, data);
    return response.data;
  },

};

export default UserAPI;