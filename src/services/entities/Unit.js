import { createSelector } from "@reduxjs/toolkit";

export class Unit {
  constructor({
    id,
    name,
    brand,
    description,
    price,
    quantity,
    file_path,
    interest,
    rebate,
    tenure,
    downpayment,
    colors,
  }) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.file_path = file_path;
    this.interest = interest;
    this.rebate = rebate;
    this.tenure = tenure;
    this.downpayment = downpayment;
    this.colors = colors;
  }

  isBrand(filter) {
    return this.brand === filter && filter !== "";
  }
}

// ? Selectors
export const UnitEntity = (state) => new Unit(state.unit.unit) ?? null;

// ? Map selector
const selectUnitDtos = (state) => state.units;

export const UnitEntities = createSelector(
  (state) => state.unit.units || [],
  (units) => units.map((u) => new Unit(u))
);
