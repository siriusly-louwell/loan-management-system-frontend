import { User } from "../../entities/User";
import { authRepository } from "../../repositories/authRepository";

export async function loginUseCase(credentials) {
  const response = await authRepository.login(credentials);

  if (!response || response.type === "credentials") {
    return {
      message: "Invalid credentials",
      type: "error",
    };
  }

  const user = new User(response.user);
  authRepository.saveToken(response.token);

  return {
    user,
    type: response.type,
    message: response.message,
  };
}
