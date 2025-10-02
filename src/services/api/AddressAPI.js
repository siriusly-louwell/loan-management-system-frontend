import axios from "axios";

const PSG_URL = process.env.REACT_APP_PSG_URL;

const AddressAPI = {
  async regions() {
    const response = await axios.get(`${PSG_URL}/regions`);
    return response.data;
  },

  async provinces(region) {
    const response = await axios.get(`${PSG_URL}/regions/${region}/provinces`);
    return response.data;
  },

  async cities(province) {
    const response = await axios.get(`${PSG_URL}/provinces/${province}/cities`);
    return response.data;
  },

  async municipalities(region) {
    const response = await axios.get(
      `${PSG_URL}/regions/${region}/municipalities`
    );
    return response.data;
  },

  async barangays(city) {
    const response = await axios.get(`${PSG_URL}/cities/${city}/barangays`);
    return response.data;
  },
};

export default AddressAPI;
