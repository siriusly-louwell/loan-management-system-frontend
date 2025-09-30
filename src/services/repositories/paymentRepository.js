import ReportAPI from "../api/ReportAPI";
import { formRepository } from "./formRepository";

export const paymentRepository = {
  async fetchAll() {
    const response = await ReportAPI.fetchAll();

    if (!response) {
      return {
        message: "Failed to fetch payments",
        type: "error",
      };
    }

    return await response;
  },

  async fetchPayment(data) {
    const response = await ReportAPI.fetchReport(data);

    if (!response) {
      return {
        message: "Failed to fetch payment",
        type: "error",
      };
    }

    return await response;
  },

  async fetchPage({ page = 1, perPage = 8, ...params }) {
    const response = await ReportAPI.paginate(page, perPage, params);

    if (!response) {
      return {
        message: "Failed to fetch payment",
        type: "error",
      };
    }

    return await response;
  },

  async pay(data) {
    const form = formRepository.formData(data);
    const response = await ReportAPI.pay(form);

    if (!response) {
      return {
        message: "Failed to submit payment",
        type: "error",
      };
    }

    return await response;
  },

  async patch(data, id) {
    const response = await ReportAPI.patch(data, id);

    if (!response) {
      return {
        message: "Failed to update payment",
        type: "error",
      };
    }

    return await response;
  },

  saveId(id) {
    localStorage.setItem("payment-id", id);
  },

  getId() {
    return localStorage.getItem("payment-id") || false;
  },

  clearId() {
    localStorage.removeItem("payment-id");
  },
};
