export const formRepository = {
  formData(obj) {
    const formData = new FormData();
    
    Object.entries(obj).forEach(([key, value]) => {
      if (Array.isArray(value))
        value.forEach((v) => formData.append(`${key}[]`, v));
      else formData.append(key, value);
    });

    return formData;
  },

  saveForm(form) {
    localStorage.setItem("form", JSON.stringify(form));
  },

  getForm() {
    return JSON.parse(localStorage.getItem("form")) || {};
  },

  clearForm() {
    localStorage.removeItem("form");
  },

  savePage(page) {
    localStorage.setItem("page-num", JSON.stringify(page));
  },

  getPage() {
    return JSON.parse(localStorage.getItem("page-num")) || {};
  },

  clearPage() {
    localStorage.removeItem("page-num");
  },
};
