import { formRepository } from "../../repositories/formRepository";
import { userRepository } from "../../repositories/userRepository";

export async function registerUseCase(data) {
  let message;
  let type = "error";

  if (data.apply_status !== "approved")
    message = "The account is not approved yet.";
  else if (data.user_id) message = "The applicant already has an account.";
  if (data.password.length < 6) {
    message = "Password must be at least 6 characters.";
    type = "warn";
  }
  if (message) return { message: message, type: type };

  const formData = formRepository.formData(data);
  const response = await userRepository.register(formData);

  return response;
}
