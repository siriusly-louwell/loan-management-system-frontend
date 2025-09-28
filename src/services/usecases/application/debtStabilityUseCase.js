export function debtStabilityUseCase(dti) {
  if (dti <= 35) return "green";
  else if (dti > 35 && dti < 46) return "yellow";
  else return "red";
}
