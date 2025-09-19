import { formRepository } from "../../repositories/formRepository";
import { unitRepository } from "../../repositories/unitRepository";

export async function editUnitUseCase(data) {
  let response;
  let payload;

  switch (data.type) {
    default:
      payload = {
        ...data.form,
        _method: "PATCH",
        colors: data.colors,
        deletes: data.files
          .filter((f) => f.status === "delete")
          .map((f) => f.id),
        news: data.files.filter((f) => f.status === "new").map((f) => f.file),
      };

      const formData = formRepository.formData(payload);
      response = await unitRepository.edit(formData, data.id);
      break;

    case "patch":
      payload = {
        quantity: data.quantity.reduce((sum, num) => sum + num, 0),
      };

      response = await unitRepository.patch(payload, data.id);
      break;
  }

  return response;
}
