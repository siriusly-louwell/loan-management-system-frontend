import { authRepository } from "../../repositories/authRepository";

export async function tokenLoginUseCase() {
  const token = authRepository.getToken();
  
  if (!token) return;

  return await authRepository.tokenLogin(token);
}
