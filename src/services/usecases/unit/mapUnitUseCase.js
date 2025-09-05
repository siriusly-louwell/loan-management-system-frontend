import { Unit } from "../../entities/Unit";

export function mapUnitUseCase(units) {
  return units.map((unit) => new Unit(unit));
}
