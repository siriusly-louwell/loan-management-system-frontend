import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const ScheduleAPI = {
  async fetchAll() {
    const response = await axios.get(`${API_URL}/api/schedule`);
    return response.data;
  },

  async paginate(page, perPage, params) {
    const response = await axios.get(`${API_URL}/api/schedule`, {
      params: { page, per_page: perPage, ...params },
    });
    return response.data;
  },

  async fetchSchedule({ id, ...params }) {
    const response = await axios.get(`${API_URL}/api/schedule/${id}`, {
      params: { ...params },
    });

    return response.data;
  },
};
