import { unitRepository } from "../../repositories/unitRepository";

export async function editUnitUseCase(data) {
  const deletes = data.files.filter((file) => file.status === "delete");
  const news = data.files.filter((file) => file.status === "new");

  const response = await unitRepository.edit({ ...data, deletes, news });

  return response;
}
