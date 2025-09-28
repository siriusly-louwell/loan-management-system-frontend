export function ndiStabilityUseCase(ndi, emi) {
  if (ndi < 0) return "red";
  else {
    const bool = emi / ndi;

    if (bool <= 0.3) return "green";
    else if (bool > 0.3 && bool < 0.41) return "yellow";
    else return "red";
  }
}
