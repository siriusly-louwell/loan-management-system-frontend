export class UnitSpecs {
  constructor({
    id,
    images,
    engine,
    compression,
    displacement,
    horsepower,
    torque,
    fuel,
    drive,
    transmission,
    cooling,
    front_suspension,
    rear_suspension,
    frame,
    travel,
    swingarm,
    dry_weight,
    wet_weight,
    seat,
    wheelbase,
    fuel_tank,
    clearance,
    tires,
    wheel,
    brakes,
    abs,
    traction,
    tft,
    lighting,
    ride_mode,
    quickshifter,
    cruise,
  }) {
    this.id = id;
    this.images = images;
    this.engine = engine;
    this.compression = compression;
    this.displacement = displacement;
    this.horsepower = horsepower;
    this.torque = torque;
    this.fuel = fuel;
    this.drive = drive;
    this.transmission = transmission;
    this.cooling = cooling;
    this.front_suspension = front_suspension;
    this.rear_suspension = rear_suspension;
    this.frame = frame;
    this.travel = travel;
    this.swingarm = swingarm;
    this.dry_weight = dry_weight;
    this.wet_weight = wet_weight;
    this.seat = seat;
    this.wheelbase = wheelbase;
    this.fuel_tank = fuel_tank;
    this.clearance = clearance;
    this.tires = tires;
    this.wheel = wheel;
    this.brakes = brakes;
    this.abs = abs;
    this.traction = traction;
    this.tft = tft;
    this.lighting = lighting;
    this.ride_mode = ride_mode;
    this.quickshifter = quickshifter;
    this.cruise = cruise;
  }

  imgURL(index) {
    return `${process.env.REACT_APP_API_URL}/storage/${this.images[index].path}`;
  }
}

// ? selector
export const UnitSpecsEntity = (state) => new UnitSpecs(state.unit.unit) ?? {};
