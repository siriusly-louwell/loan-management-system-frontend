import { formRepository } from "../../repositories/formRepository";
import { unitRepository } from "../../repositories/unitRepository";

export async function editUnitUseCase(data) {
  // Debug formdata
  for (let [key, value] of data.entries()) {
    console.log(key, value);
  }

  const response = await unitRepository.patch(data, data.get("id"));
  return response;
}
