import { addressRepository } from "../../repositories/addressRepository";

export function checkEmptyUseCase(pageNum, form, type = "applicant") {
  const keepFlags = {
    keep_personal: form.keep_personal || false,
    keep_parent: form.keep_parent || false,
    keep_spouse: form.keep_spouse || false,
  };

  let hasEmpty = false;
  const fields = addressRepository.getFields(pageNum, type, keepFlags);
  let updatedForm = addressRepository.filterFields(pageNum, keepFlags, form);

  if (fields.length > 0)
    fields.forEach((field) => {
      const value = updatedForm[field];

      if (
        value === "__EMPTY__" ||
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        updatedForm[field] = "__EMPTY__";
        hasEmpty = true;
      }
    });

  return { form: updatedForm, hasEmpty };
}
