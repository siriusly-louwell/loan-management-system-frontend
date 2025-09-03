import { authRepository } from "../../repositories/authRepository";

export async function loginUseCase(credentials) {
  const response = await authRepository.login(credentials);

  if (!response || response.type === "credentials") {
    return {
      message: "Invalid credentials",
      type: "error",
    };
  }
  authRepository.saveToken(response.token);
  const { user, type, message } = response;

  return { user: user, type: type, message: message };
}
