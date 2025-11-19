import { formRepository } from "../../repositories/formRepository";
import { unitRepository } from "../../repositories/unitRepository";

export async function addUnitUseCase(data) {
  let message;
  // formData is FormData, can't do files.length, colors.length, etc.
  const response = await unitRepository.add(data);

  return response;
}
