import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const UnitAPI = {
  async fetchAll() {
    const response = await axios.get(`${API_URL}/api/motorcycle`);
    return response.data;
  },

  async fetchUnit(id) {
    const response = await axios.get(`${API_URL}/api/motorcycle/${id}`);
    return response.data;
  },

  async add(data) {
    const response = await axios.post(`${API_URL}/api/motorcycle`, data);
    return response.data;
  },

};

export default UnitAPI;