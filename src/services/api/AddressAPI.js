import axios from "axios";

const PSG_URL = process.env.REACT_APP_PSG_URL;

const AddressAPI = {
  async regions() {
    const response = await axios.get(`${PSG_URL}/regions`);
    return response.data;
  },

  async provinces(region = 1100000000) {
    const response = await axios.get(`${PSG_URL}/regions/${region}/provinces`);
    return response.data;
  },

  async cities(province = 1102300000) {
    const response = await axios.get(`${PSG_URL}/provinces/${province}/cities`);
    return response.data;
  },

  async municipalities(region = 1100000000) {
    const response = await axios.get(
      `${PSG_URL}/regions/${region}/municipalities`
    );
    return response.data;
  },

  async barangays(city = 1102315000) {
    const response = await axios.get(`${PSG_URL}/cities/${city}/barangays`);
    return response.data;
  },

  // ? Fetch single address
  async region(code) {
    const response = await axios.get(`${PSG_URL}/regions/${code}`);
    return response.data;
  },

  async province(code) {
    const response = await axios.get(`${PSG_URL}/provinces/${code}`);
    return response.data;
  },

  async city(code) {
    const response = await axios.get(`${PSG_URL}/cities/${code}`);
    return response.data;
  },

  async municipality(code) {
    const response = await axios.get(`${PSG_URL}/municipalities/${code}`);
    return response.data;
  },

  async barangay(code) {
    const response = await axios.get(`${PSG_URL}/barangays/${code}`);
    return response.data;
  },
};

export default AddressAPI;
