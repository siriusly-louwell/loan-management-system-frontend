import ReportAPI from "../api/ReportAPI";
import { formRepository } from "./formRepository";

export const reportRepository = {
  async fetchAll() {
    const response = await ReportAPI.fetchAll();

    if (!response) {
      return {
        message: "Failed to fetch reports",
        type: "error",
      };
    }

    return await response;
  },

  async fetchReport(data) {
    const response = await ReportAPI.fetchReport(data);

    if (!response) {
      return {
        message: "Failed to fetch report",
        type: "error",
      };
    }

    return await response;
  },

  async fetchPage({ page = 1, perPage = 8, ...params }) {
    const response = await ReportAPI.paginate(page, perPage, params);

    if (!response) {
      return {
        message: "Failed to fetch report",
        type: "error",
      };
    }

    return await response;
  },

  async report(data) {
    const form = formRepository.formData(data);
    const response = await ReportAPI.report(form);

    if (!response) {
      return {
        message: "Failed to submit report",
        type: "error",
      };
    }

    return await response;
  },

  async patch(data, id) {
    const response = await ReportAPI.patch(data, id);

    if (!response) {
      return {
        message: "Failed to update report",
        type: "error",
      };
    }

    return await response;
  },

  saveId(id) {
    localStorage.setItem("report-id", id);
  },

  getId() {
    return localStorage.getItem("report-id") || false;
  },

  clearId() {
    localStorage.removeItem("report-id");
  },
};
