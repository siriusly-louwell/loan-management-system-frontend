import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ApplicationAPI = {
//   async fetchAll() {
//     const response = await axios.get(`${API_URL}/api/motorcycle`);
//     return response.data;
//   },

//   async fetchApplication(id) {
//     const response = await axios.get(`${API_URL}/api/motorcycle/${id}`);
//     return response.data;
//   },

  async apply(data) {
    const response = await axios.post(`${API_URL}/api/application`, data);
    return response.data;
  },

};

export default ApplicationAPI;