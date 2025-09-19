import { formRepository } from "../../repositories/formRepository";
import { unitRepository } from "../../repositories/unitRepository";

export async function addUnitUseCase(data) {
  if (data.files.length === 0)
    return {
      message: "Please select images for the unit.",
      type: "warn",
    };

  // const totalQuantity = data.form.quantity.reduce((sum, num) => sum + num, 0);
  const payload = {
    ...data.form,
    quantity: data.form.quantity.reduce((sum, num) => sum + num, 0),
    colors: data.colors,
    files: data.files,
  };

  const formData = formRepository.formData(payload);
  const response = await unitRepository.add(formData);

  return response;
}
