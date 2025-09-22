import { formRepository } from "../../repositories/formRepository";
import { unitRepository } from "../../repositories/unitRepository";

export async function addUnitUseCase(data) {
  let message;

  if (data.files.length === 0) message = "Please select images for the unit.";
  else if (data.colors.length === 0 || data.colors.length !== data.files.length)
    message = "The unit must have colors.";
  else if (data.angles.length === 0)
    message = "Add images from different angles of the unit.";

  if (message) return { message: message, type: "warn" };

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
