import PaymentAPI from "../api/PaymentAPI";
import { formRepository } from "./formRepository";

export const paymentRepository = {
  async fetchAll() {
    const response = await PaymentAPI.fetchAll();

    if (!response)
      return {
        message: "Failed to fetch payments",
        type: "error",
      };

    return await response;
  },

  async fetchPayment(data) {
    const response = await PaymentAPI.fetchPayment(data);

    if (!response)
      return {
        message: "Failed to fetch payment",
        type: "error",
      };

    return await response;
  },

  async fetchPage({ page = 1, perPage = 8, ...params }) {
    const response = await PaymentAPI.paginate(page, perPage, params);

    if (!response)
      return {
        message: "Failed to fetch payment",
        type: "error",
      };

    return await response;
  },

  async countPayments(params) {
    const response = await PaymentAPI.count(params);

    if (!response)
      return {
        message: "Failed to fetch results",
        type: "error",
      };

    return await response;
  },

  async pay(data) {
    data = { ...data, cert_num: this.generateID() };
    const form = formRepository.formData(data);
    const response = await PaymentAPI.pay(form);

    if (!response)
      return {
        message: "Failed to save payment",
        type: "error",
      };

    return await response;
  },

  async patch(data, id) {
    const response = await PaymentAPI.patch(data, id);

    if (!response)
      return {
        message: "Failed to update payment",
        type: "error",
      };

    return await response;
  },

  generateID() {
    const now = new Date();
    const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}${String(now.getDate()).padStart(2, "0")}`;
    const randomPart = Math.random().toString(36).substr(2, 6).toUpperCase();

    return `INV-${datePart}-${randomPart}`;
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
