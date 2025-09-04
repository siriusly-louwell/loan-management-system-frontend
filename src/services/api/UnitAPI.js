import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const UserAPI = {
  async add(data) {
    const response = await axios.post(`${API_URL}/api/motorcycle`, data);
    return response.data;
  },

  // async register(data) {
  //   const response = await axios.post(`${API_URL}/api/account`, data);
  //   return response.data;
  // },
};

export default UserAPI;