import { formRepository } from "../../repositories/formRepository";
import { userRepository } from "../../repositories/userRepository";

export async function addUserUseCase(data) {
  // if (data.pfp && data.pfp.size === 0)
  //   return { message: "Please add a profile picture.", type: "warn" };

  const formData = formRepository.formData({ ...data.form });
  const response = await userRepository.add(formData);

  return response;
}
