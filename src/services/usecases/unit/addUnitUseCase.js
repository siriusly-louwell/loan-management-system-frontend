import { formRepository } from "../../repositories/formRepository";
import { unitRepository } from "../../repositories/unitRepository";

export async function addUnitUseCase(data) {
  if (data.files.length === 0)
    return {
      message: "Please select images for the unit.",
      type: "warn",
    };

  if (data.colors.length === 0 || data.colors.length !== data.files.length)
    return {
      message: "The unit must have colors.",
      type: "warn",
    };

  if (data.angles.length === 0)
    return {
      message: "Add images from different angles of the unit.",
      type: "warn",
    };

  const payload = {
    ...data.form,
    totalQuantity: data.form.quantity.reduce((sum, num) => sum + num, 0),
    colors: data.colors,
    files: data.files,
    angles: data.angles,
  };

  const formData = formRepository.formData(payload);
  const response = await unitRepository.add(formData);

  return response;
}
