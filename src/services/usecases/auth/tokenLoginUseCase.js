import { authRepository } from "../../repositories/authRepository";

export async function tokenLoginUseCase(token) {
  const response = await authRepository.tokenLogin(token);

  if (!response || response.type === "credentials") {
    return {
      message: "Invalid credentials",
      type: "error",
    };
  }

  return response;
}
