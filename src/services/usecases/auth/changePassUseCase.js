import { authRepository } from "../../repositories/authRepository";

export async function changePassUseCase(data) {
  const passwordError = validatePassword(
    data.new_password,
    data.new_password_confirmation
  );

  if (passwordError) return { type: "warn", message: passwordError };

  const response = await authRepository.changePassword(data);
  return response;
}

function validatePassword(password, confirm) {
  if (!password) return "Password is required.";

  if (password.length < 8)
    return "Password must be at least 8 characters long.";

  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter.";

  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter.";

  if (!/[0-9]/.test(password))
    return "Password must contain at least one number.";

  if (password !== confirm) return "Passwords do not match";

  return null;
}
