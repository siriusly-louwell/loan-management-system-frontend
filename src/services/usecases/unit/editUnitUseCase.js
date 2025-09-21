import { formRepository } from "../../repositories/formRepository";
import { unitRepository } from "../../repositories/unitRepository";

export async function editUnitUseCase(data) {
  let response;

  // ? edit all unit details
  if (data.type === "edit") {
    if (data.files.length === 0)
      return {
        message: "Please select images for the unit.",
        type: "warn",
      };

    if (data.colors.length !== data.files.length || data.colors.length === 0)
      return {
        message: "Specify the color of the image.",
        type: "warn",
      };

    if (data.angles.length === 0)
      return {
        message: "Add images from different angles of the unit.",
        type: "warn",
      };

    const images = [...data.files, ...data.angles];
    const payload = {
      ...data.form,
      _method: "PATCH",
      colors: data.colors,
      totalQuantity: data.totalQuantity,
      deletes: images.filter((f) => f.status === "delete").map((f) => f.id),
      newColors: data.files
        .filter((f) => f.status === "new")
        .map((f) => f.file),
      newAngles: data.angles
        .filter((f) => f.status === "new")
        .map((f) => f.file),
    };

    const formData = formRepository.formData(payload);
    response = await unitRepository.edit(formData, data.form.id);
  }

  // ? edit unit stocks
  if (data.type === "patch") {
    const payload = {
      colors: data.colors,
      totalQuantity: data.quantity,
      quantity: data.quantity.reduce((sum, num) => sum + num, 0),
    };

    response = await unitRepository.patch(payload, data.id);
  }

  return response;
}
