export const formRepository = {
  saveForm(form) {
    localStorage.setItem("form", form);
  },

  getForm() {
    return localStorage.getItem("form") || false;
  },

  clearForm() {
    localStorage.removeItem("form");
  },
};
