import { authRepository } from "../../repositories/authRepository";

export async function changePassUseCase(data) {
  const error = validatePassword(
    data.new_password,
    data.new_password_confirmation
  );

  if (error) return { type: "warn", message: error.message };

  const response = await authRepository.changePassword(data);
  return response;
}

export function validatePassword(password, confirm) {
  if (!password) return "Password is required.";

  if (password.length < 8)
    return {
      type: "length",
      message: "Password must be at least 8 characters long.",
    };

  if (!/[A-Z]/.test(password))
    return {
      type: "uppercase",
      message: "Password must contain at least one uppercase letter.",
    };

  if (!/[a-z]/.test(password))
    return {
      type: "lowercase",
      message: "Password must contain at least one lowercase letter.",
    };

  if (!/[0-9]/.test(password))
    return {
      type: "number",
      message: "Password must contain at least one number.",
    };

  if (password !== confirm)
    return { type: "match", message: "Passwords do not match" };

  return null;
}
