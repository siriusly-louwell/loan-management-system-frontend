import { ADDRESS_NAMES, FIELD_NAMES } from "../../../constants/formFields";

export function checkEmptyUseCase(pageNum, form, type = "applicant") {
  const fields =
    type === "applicant" ? FIELD_NAMES[pageNum] : ADDRESS_NAMES[pageNum];
  let hasEmpty = false;
  const updatedForm = { ...form[type] };

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

  return { form: updatedForm, hasEmpty: hasEmpty };
}
