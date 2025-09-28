export function calculateViability({ green, red, yellow }) {
  if (green === 3) return "eligible";
  if (green === 2 && yellow === 1) return "passed";
  if (green === 1 && yellow === 2) return "passed";
  if (yellow === 3) return "review";
  if (red === 1 && yellow === 2) return "not_eligible";
  if (red === 2 && yellow === 1) return "not_eligible";
  if (red === 3) return "reject";
  else return "review";
}
