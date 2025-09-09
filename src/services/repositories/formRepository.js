export const formRepository = {
  saveForm(form) {
    localStorage.setItem("form", JSON.stringify(form));
  },

  getForm() {
    return JSON.parse(localStorage.getItem("form")) || {};
  },

  clearForm() {
    localStorage.removeItem("form");
  },
};
