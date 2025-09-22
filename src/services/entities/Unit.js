import { createSelector } from "@reduxjs/toolkit";
import motor_icon from "../../assets/images/motor_icon.png";

export class Unit {
  constructor({
    id,
    name,
    brand,
    unit_type,
    description,
    price,
    quantity,
    file_path,
    interest,
    rebate,
    tenure,
    downpayment,
    colors,
    created_at,
  }) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.unit_type = unit_type;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.file_path = file_path;
    this.interest = interest;
    this.rebate = rebate;
    this.tenure = tenure;
    this.downpayment = downpayment;
    this.colors = colors;
    this.created_at = created_at;
  }

  imgURL() {
    return this.file_path === "motor_icon"
      ? motor_icon
      : `${process.env.REACT_APP_API_URL}/storage/${this.file_path}`;
  }

  isBrand(filter) {
    return this.brand === filter && filter !== null;
  }

  isNew() {
    const date = new Date(this.created_at);
    const now = new Date();
    const start = new Date();

    now.setHours(23, 59, 59, 999);
    start.setDate(now.getDate() - 2);
    start.setHours(0, 0, 0, 0);

    return date >= start && date <= now;
  }
}

// ? Selectors
export const UnitEntity = (state) => new Unit(state.unit.unit) ?? {};

// ? Map selector
const selectUnitDtos = (state) => state.units;

export const UnitEntities = createSelector(
  (state) => state.unit.units || [],
  (units) => units.map((u) => new Unit(u))
);
