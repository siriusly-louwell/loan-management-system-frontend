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
  }
}

// ? selector
export const UnitEntity = (state) => new Unit(state.auth.user) ?? null;
