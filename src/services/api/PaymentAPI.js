import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const PaymentAPI = {
  async fetchAll() {
    const response = await axios.get(`${API_URL}/api/payment`);
    return response.data;
  },

  async paginate(page, perPage, params) {
    const response = await axios.get(`${API_URL}/api/payment`, {
      params: { page, per_page: perPage, ...params },
    });
    return response.data;
  },

  async fetchPayment({ id, ...params }) {
    const response = await axios.get(`${API_URL}/api/payment/${id}`, {
      params: { ...params },
    });
    return response.data;
  },

  async pay(data) {
    const response = await axios.post(`${API_URL}/api/payment`, data);
    return response.data;
  },

  async patch(data, id) {
    const response = await axios.patch(
      `${API_URL}/api/payment/${id}`,
      data
    );
    return response.data;
  },

  imgPath(image) {
    return `${API_URL}/storage/${image}`;
  },
};

export default PaymentAPI;
