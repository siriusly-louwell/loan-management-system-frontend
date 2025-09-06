import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AddtoCartBttn from "../components/buttons/AddtoCartBttn";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import EMICalculator from "./EMICalculator";
import ColorLabel from "../components/ColorLabel";
import SmallLabel from "../components/texts/SmallLabel";
import FormSelect from "../components/inputs/FormSelect";
import PfpLabel from "../components/PfpLabel";
import SmallSpin from "../components/loading components/SmallSpin";
import ImageSkeleton from "../components/loading components/ImageSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnit } from "../services/redux/slices/unitSlice";
import { UnitEntity } from "../services/entities/Unit";
import { UnitSpecsEntity } from "../services/entities/UnitSpecs";
import { toggleSlide } from "../services/redux/slices/uiSlice";
import BasicCarousel from "../components/cards/BasicCarousel";

export default function ProductInfo({ staff = false }) {
  const dispatch = useDispatch();
  const { unitLoading, images } = useSelector((state) => state.unit);
  const unit = useSelector(UnitEntity);
  const specs = useSelector(UnitSpecsEntity);
  const { state } = useLocation();
  const [id, setId] = useState(staff ? 1 : state?.id);
  const [addUnit, setUnits] = useState([]);
  const [selected, setSelected] = useState([id]);
  const [selectColor, setSelectColor] = useState([]);

  function selectUnits(unit) {
    const newSelected = selected.includes(unit)
      ? selected.filter((select) => select !== unit)
      : [...selected, unit];

    setSelected(newSelected);
  }

  useEffect(() => {
    dispatch(fetchUnit(id));
    // fetch("http://127.0.0.1:8000/api/motorcycle/" + id)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setUnit(data);
    //     setUnitLoad(false);
    //     setSelectColor([selected.length - 1, data.colors[0].color]);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data: ", error);
    //     setUnitLoad(true);
    //   });
  }, [id]);

  return (
    <section className="pb-6 bg-gray-100 md:pb-10 md:pt-2 dark:bg-gray-800 antialiased">
      <div className="max-w-screen-xl mt-10 px-4 pb-6 mx-auto 2xl:px-0">
        {/* <BasicTabs ids={selected} state={id} setId={setId} load={unitLoading} /> */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-15 xl:gap-16">
          {
            <>
              <div className="relative w-full h-[70vh] max-h-[70vh] space-y-4 lg:max-w-3xl mx-auto rounded-xl overflow-hidden">
                <BasicCarousel length={images.length}>
                  {unitLoading ? (
                    //   <div className="w-full h-10 bg-gray-200 dark:bg-gray-500 animate-pulse rounded-md"></div>
                    <div className="flex justify-center items-center w-full h-full">
                      <ImageSkeleton />
                    </div>
                  ) : (
                    <>
                      {staff ? (
                        <FormSelect
                          name="motor"
                          id="motor"
                          value={`${unit.brand}: ${unit.name} - ₱${parseFloat(
                            unit.price
                          ).toLocaleString()}`}
                          label="Select Unit"
                          onchange={(e) => setId(e.target.value)}>
                          {addUnit.map((motor) => (
                            <option value={motor.id}>
                              {motor.brand}: {motor.name} - ₱
                              {parseFloat(motor.price).toLocaleString()}
                            </option>
                          ))}
                        </FormSelect>
                      ) : (
                        ""
                      )}
                      {images.map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-full object-contain flex-shrink-0 rounded-xl bg-gray-200 dark:bg-gray-600"
                        />
                      ))}
                      ={" "}
                    </>
                  )}
                </BasicCarousel>
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0">
                {unitLoading ? (
                  <h1 className="h-5 bg-gray-200 dark:bg-gray-500 rounded-full animate-pulse w-60 mb-4"></h1>
                ) : (
                  <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                    {unit.name} ({unit.brand})
                  </h1>
                )}

                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  {unitLoading ? (
                    <p className="h-8 bg-gray-200 dark:bg-gray-500 rounded-full animate-pulse w-40 mb-4"></p>
                  ) : (
                    <p className="text-2xl font-extrabold text-rose-600 sm:text-3xl dark:text-rose-500">
                      ₱{parseFloat(unit.price).toLocaleString()}
                    </p>
                  )}
                  <div className="flex space-x-2">
                    <div className="grid grid-cols-10 gap-y-2">
                      {unitLoading
                        ? ""
                        : unit.colors.map((color, i) => (
                            <div key={i}>
                              <label htmlFor={`${i}_${color.color}`}>
                                <ColorLabel key={i} style={color.color} />
                              </label>
                              <input
                                type="button"
                                id={`${i}_${color.color}`}
                                className="hidden"
                                onClick={() => {
                                  dispatch(toggleSlide({ value: i }));
                                  setSelectColor([
                                    selected.length - 1,
                                    color.color,
                                  ]);
                                }}
                              />
                            </div>
                          ))}
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2">
                  <SmallLabel
                    label="Annual Interest"
                    text={
                      unitLoading ? (
                        <SmallSpin size={20} />
                      ) : (
                        `${unit.interest}%`
                      )
                    }
                  />
                  <SmallLabel
                    label="Rebate"
                    text={
                      unitLoading ? (
                        <SmallSpin size={20} />
                      ) : (
                        `₱${parseFloat(unit.rebate).toLocaleString()}`
                      )
                    }
                  />
                  <SmallLabel
                    label="Loan Tenure"
                    text={
                      unitLoading ? (
                        <SmallSpin size={20} />
                      ) : (
                        `${unit.tenure} years`
                      )
                    }
                  />
                  <SmallLabel
                    label="Stock"
                    text={
                      unitLoading ? (
                        <SmallSpin size={20} />
                      ) : (
                        `${unit.quantity} units`
                      )
                    }
                  />
                </div>

                <div className="mt-6 sm:gap-4 space-y-2 sm:items-center sm:flex sm:mt-8">
                  <BttnwithIcon text="Add to favorites">
                    <svg
                      className="w-5 h-5 -ms-2 me-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                      />
                    </svg>
                  </BttnwithIcon>
                  {/* <Button text="Apply Loan" onclick={() => navigate('/customer/apply')} /> */}
                  <AddtoCartBttn
                    text="Apply Loan"
                    state={{ selected: selected, selectColor: selectColor }}
                    url="/customer/apply"
                  />
                  <AddtoCartBttn text="Pay in Cash" />
                </div>
                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
                <div className="mb-6 text-gray-500 dark:text-gray-400">
                  {unitLoading ? (
                    <>
                      <div className="w-full flex justify-between items-start animate-pulse">
                        <div className="block">
                          <div className="h-3 bg-gray-300 dark:bg-gray-500 rounded-full  w-48 mb-4"></div>
                          <p className="h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-32 mb-2.5"></p>
                        </div>
                        <span className="h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-16 "></span>
                      </div>
                      <div className=" w-full flex justify-between items-start animate-pulse">
                        <div className="block">
                          <div className="h-3 bg-gray-300 dark:bg-gray-500 rounded-full  w-60 mb-4"></div>
                          <div className="h-3 bg-gray-300 dark:bg-gray-500 rounded-full  w-58 mb-4"></div>
                          <p className="h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-40 mb-2.5"></p>
                          <p className="h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-50 mb-2.5"></p>
                          <p className="h-2 bg-gray-300 dark:bg-gray-500 rounded-full w-50 mb-2.5"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    `${unit.description}`
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:gap-5 col-span-2 mb-5 lg:grid-cols-5 grid-cols-2 md:grid-cols-3">
                <PfpLabel caption="Engine" label={specs.engine} />
                <PfpLabel
                  caption="Compression Ratio"
                  label={specs.compression}
                />
                <PfpLabel
                  caption="Displacement (cc)"
                  label={specs.displacement}
                />
                <PfpLabel caption="Horsepower (hp)" label={specs.horsepower} />
                <PfpLabel caption="Torque (Nm)" label={specs.torque} />
                <PfpLabel caption="Fuel System" label={specs.fuel} />
                <PfpLabel caption="Final Drive" label={specs.drive} />
                <PfpLabel caption="Transmission" label={specs.transmission} />
                <PfpLabel caption="Cooling System" label={specs.cooling} />
                <PfpLabel
                  caption="Front Suspension"
                  label={specs.front_suspension}
                />
                <PfpLabel
                  caption="Rear Suspension"
                  label={specs.rear_suspension}
                />
                <PfpLabel caption="Frame Type" label={specs.frame} />
                <PfpLabel
                  caption="Front/Rear Travel (mm/in)"
                  label={specs.travel}
                />
                <PfpLabel caption="Swingarm Type" label={specs.swingarm} />
                <PfpLabel caption="Dry Weight" label={specs.dry_weight} />
                <PfpLabel caption="Wet Weight" label={specs.wet_weight} />
                <PfpLabel caption="Seat Height (mm/in)" label={specs.seat} />
                <PfpLabel caption="Wheelbase" label={specs.wheelbase} />
                <PfpLabel
                  caption="Fuel Tank Capacity"
                  label={specs.fuel_tank}
                />
                <PfpLabel caption="Ground Clearance" label={specs.clearance} />
                <PfpLabel caption="Tire Size" label={specs.tires} />
                <PfpLabel caption="Wheel Type" label={specs.wheel} />
                <PfpLabel caption="Brakes" label={specs.brakes} />
                <PfpLabel caption="ABS" label={specs.abs} />
                <PfpLabel caption="Traction Control" label={specs.traction} />
                <PfpLabel caption="TFT Display" label={specs.tft} />
                <PfpLabel caption="Lighting" label={specs.lighting} />
                <PfpLabel caption="Riding Modes" label={specs.ride_mode} />
                <PfpLabel caption="Quickshifter" label={specs.quickshifter} />
                <PfpLabel caption="Cruise Control" label={specs.cruise} />
              </div>
            </>
          }
        </div>
      </div>
      <EMICalculator
        name={unit.name}
        brand={unit.brand}
        motorPrice={unit.price}
        years={unit.tenure}
        down={unit.downpayment}
        interest={unit.interest}
        staff={staff}
        load={unitLoading}
      />
      {/* <div
        id="add_units"
        className="overflow-y-auto overflow-x-hidden hidden fixed bg-gray-400 dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-60 top-0 right-0 left-0 z-50 justify-items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
          <div className="relative p-4 bg-gray-100 h-fit rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select units
              </h3>
              <CloseBttn id="add_units" cancel={[]} trigger={setSelected} />
            </div>
            <ProductGrid addunit={true}>
              {addLoad ? (
                <div>Loading...</div>
              ) : (
                addUnit.map((motor) => {
                  return id !== motor.id ? (
                    <ProductCard
                      key={motor.id}
                      id={motor.id}
                      unit={motor}
                      selected={selected}
                      selectUnits={selectUnits}
                    />
                  ) : (
                    ""
                  );
                })
              )}
            </ProductGrid>
            <Button
              text="Done"
              onclick={() =>
                (document.getElementById("add_units").style.display = "none")
              }
            />
            <Spinner id="product_spin" />
          </div>
        </div>
      </div> */}
    </section>
  );
}
