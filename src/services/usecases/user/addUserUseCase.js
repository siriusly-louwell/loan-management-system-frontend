import { authRepository } from "../../repositories/authRepository";
import { formRepository } from "../../repositories/formRepository";
import { userRepository } from "../../repositories/userRepository";

export async function addUserUseCase(data) {
  if (!data.form.contact)
    return { message: "Phone number is required", type: "warn" };
  if (!data.form.gender) return { message: "Gender is required", type: "warn" };

  const hash = authRepository.generateRandomString(4);
  const password = `temp_${data.form.last_name}_${hash}`;

  const formData = formRepository.formData({ ...data.form, password });
  const response = await userRepository.add(formData);

  return response;
}
