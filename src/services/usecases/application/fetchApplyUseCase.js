import { formRepository } from "../../repositories/formRepository";
import { applyRepository } from "../../repositories/applyRepository";

export async function fetchApplyUseCase(data) {
  const formData = formRepository.formData(data);
  const response = await applyRepository.fetchPage(formData);

  return response;
}
