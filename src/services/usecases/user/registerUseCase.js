import { formRepository } from "../../repositories/formRepository";
import { userRepository } from "../../repositories/userRepository";

export async function registerUseCase(data) {
  if (data.pfp && data.pfp.size === 0)
    return { message: "Please add a profile picture.", type: "warn" };

  const formData = formRepository.formData({ ...data.form, pfp: data.pfp });
  const response = await userRepository.register(formData);

  return response;
}
