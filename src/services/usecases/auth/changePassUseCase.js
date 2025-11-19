import { authRepository } from "../../repositories/authRepository";

export async function changePassUseCase(data) {
  if (!data.current_password)
    return { type: "warn", message: "Current password is required." };
  if (!data.new_password)
    return { type: "warn", message: "New password is required." };

  const checks = [
    { key: "length", message: "Password must be at least 8 characters long." },
    {
      key: "uppercase",
      message: "Password must contain at least one uppercase letter.",
    },
    {
      key: "lowercase",
      message: "Password must contain at least one lowercase letter.",
    },
    { key: "number", message: "Password must contain at least one number." },
    { key: "match", message: "Passwords do not match" },
  ];

  for (const check of checks) {
    const valid = validatePassword(
      data.new_password,
      data.new_password_confirmation,
      check.key
    );

    if (!valid) return { type: "warn", message: check.message };
  }

  const response = await authRepository.changePassword(data);
  return response;
}

export function validatePassword(password, confirm, type) {
  switch (type) {
    default:
      return password.length >= 8;
    case "uppercase":
      return /[A-Z]/.test(password);
    case "lowercase":
      return /[a-z]/.test(password);
    case "number":
      return /[0-9]/.test(password);
    case "match":
      return password === confirm;
  }
}
