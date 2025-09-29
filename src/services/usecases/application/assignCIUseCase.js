import { applyRepository } from "../../repositories/applyRepository";

export async function assignCIUseCase(data) {
  if (data.ci_id === undefined || data.ci_id === "__EMPTY__")
    return {
      message: "Please select a Credit Investigator",
      type: "error",
      noCI: true,
    };

  return await applyRepository.patch(data, data.id);
}
