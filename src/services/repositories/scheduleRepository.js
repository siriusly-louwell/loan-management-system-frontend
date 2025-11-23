import { ScheduleAPI } from "../api/ScheduleAPI";

export const scheduleRepository = {
  async fetchAll() {
    const response = await ScheduleAPI.fetchAll();

    if (!response)
      return {
        message: "Failed to fetch schedules",
        type: "error",
      };

    return await response;
  },

  async fetchSchedule(data) {
    const response = await ScheduleAPI.fetchSchedule(data);

    if (!response)
      return {
        message: "Failed to fetch schedule",
        type: "error",
      };

    return await response;
  },

  async fetchPage({ page = 1, perPage = 8, ...params }) {
    const response = await ScheduleAPI.paginate(page, perPage, params);

    if (!response)
      return {
        message: "Failed to fetch schedule",
        type: "error",
      };

    return await response;
  },

  saveId(id) {
    localStorage.setItem("schedule-id", id);
  },

  getId() {
    return localStorage.getItem("schedule-id") || false;
  },

  clearId() {
    localStorage.removeItem("schedule-id");
  },
};
