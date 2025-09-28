export function empStabilityUseCase(rate, years) {
  const inc = parseFloat(rate) >= 15000;
  const year = years >= 1;

  return inc && year ? "green" : inc || year ? "yellow" : "red";
}
