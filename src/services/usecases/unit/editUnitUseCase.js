import { formRepository } from "../../repositories/formRepository";
import { unitRepository } from "../../repositories/unitRepository";

export async function editUnitUseCase(data) {
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

  let response;
  let payload;
  const images = [...data.files, ...data.angles];

  switch (data.type) {
    default:
      payload = {
        ...data.form,
        _method: "PATCH",
        colors: data.colors,
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
      break;

    case "patch":
      payload = {
        quantity: data.quantity.reduce((sum, num) => sum + num, 0),
      };

      response = await unitRepository.patch(payload, data.form.id);
      break;
  }

  return response;
}
