import { formRepository } from "../../repositories/formRepository";
import { unitRepository } from "../../repositories/unitRepository";

export async function editUnitUseCase(data) {
  const payload = {
    ...data.form,
    _method: "PATCH",
    colors: data.colors,
    deletes: data.files.filter((f) => f.status === "delete").map((f) => f.id),
    news: data.files.filter((f) => f.status === "new").map((f)=>f.file),
  };

  const formData = formRepository.formData(payload);
  const response = await unitRepository.edit(formData, data.id);

  return response;
}
