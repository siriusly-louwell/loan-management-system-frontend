import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setAlert,
  toggleModal,
} from "../services/redux/slices/uiSlice";
import { addUnit } from "../services/redux/slices/unitSlice";
import FormInput from "../components/inputs/FormInput";
import FormTextarea from "../components/inputs/FormTextarea";
import Button from "../components/buttons/Button";
import CloseBttn from "../components/buttons/CloseBttn";
import Cloud from "../assets/icons/Cloud";
import CustomBttn from "../components/buttons/CustomBttn";
import QuantityInput from "../components/buttons/QuantityInput";
import ColorModal from "../components/modals/ColorModal";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import Plus from "../assets/icons/Plus";
import ColorLabel from "../components/ColorLabel";
import FormSelect from "../components/inputs/FormSelect";
import {
  setColorIndex,
  resetInput,
  handleChange,
  initialForm,
} from "../services/redux/slices/formSlice";

export default function CreateProduct() {
  const [files, setFiles] = useState([]);
  const { colors, formData, formType } = useSelector((state) => state.form);
  const { modals } = useSelector((state) => state.ui);
  const [rows, setRows] = useState([""]);
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(setLoading({ isActive: true, text: "Saving data..." }));

    try {
      const form = formData[formType];
      const response = await dispatch(
        addUnit({ form, files, colors })
      ).unwrap();

      dispatch(setLoading({ isActive: false }));
      dispatch(setAlert({ message: response.message, type: response.type }));
      dispatch(resetInput());
      setFiles([]);
    } catch (error) {
      console.error("Error: ", error);
      dispatch(setLoading({ isActive: false }));
      dispatch(
        setAlert({
          message: "Something went wrong. Please try again",
          type: "error",
        })
      );
    }
  }

  function fileChange(event, i) {
    const updatedFiles = [...files];
    updatedFiles[i] = [...event.target.files];

    setFiles(updatedFiles);
  }

  function dispatchInput(event) {
    dispatch(
      handleChange({
        name: event.target.name,
        value: event.target.value,
        formType: "createUnit",
      })
    );
  }

  return (
    <div
      id="createProduct"
      className="overflow-y-auto overflow-x-hidden fixed bg-gray-400 dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-40 top-0 right-0 left-0 z-40 justify-items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: [0.8, 1, 1], opacity: 1 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}>
          <div className="relative p-4 w-full max-w-6xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add Unit
                </h3>
                <CloseBttn
                  id="createProduct"
                  trigger={() =>
                    dispatch(
                      toggleModal({
                        name: "createUnit",
                        value: modals?.createUnit,
                      })
                    )
                  }
                />
              </div>
              <form onSubmit={handleSubmit} className="lg:flex">
                <section className="lg:w-1/2 lg:pr-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-5 dark:text-white">
                    Motorcycle Details
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4 mb-3">
                    <div className="grid gap-4 sm:col-span-2">
                      <FormInput
                        label="Motorcycle Name"
                        type="text"
                        value={formData.createUnit.name || ""}
                        onchange={dispatchInput}
                        name="name"
                        id="name"
                        placeholder="Type motorcycle name"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                      <FormSelect
                        label="Brand Name"
                        name="brand"
                        id="brand"
                        value={formData.createUnit.brand || ""}
                        onchange={dispatchInput}>
                        <option>Honda</option>
                        <option>Yamaha</option>
                        <option>Suzuki</option>
                        <option>Kawasaki</option>
                        <option>KTM</option>
                        <option>Kymco</option>
                        <option>SYM</option>
                        <option>Skygo</option>
                        <option>Bennelli</option>
                        <option>Bristol</option>
                        <option>Rusi</option>
                        <option>Motorstar</option>
                        <option>QJMotor</option>
                        <option>FKM</option>
                      </FormSelect>
                      <FormInput
                        label="Price"
                        type="number"
                        id="price"
                        name="price"
                        value={formData.createUnit.price || ""}
                        onchange={dispatchInput}
                        placeholder="₱150,000"
                      />
                      <FormInput
                        label="Minimum Downpayment"
                        type="number"
                        id="down"
                        name="downpayment"
                        value={formData.createUnit.downpayment || ""}
                        onchange={dispatchInput}
                        placeholder="₱25,000"
                      />
                      <FormInput
                        label="Rebate"
                        type="number"
                        id="rebate"
                        name="rebate"
                        value={formData.createUnit.rebate || ""}
                        onchange={dispatchInput}
                        placeholder="₱15,000"
                      />
                      <FormInput
                        label="Interest Rate (%)"
                        type="number"
                        id="interest"
                        name="interest"
                        value={formData.createUnit.interest || ""}
                        onchange={dispatchInput}
                        placeholder="10%"
                      />
                      <FormInput
                        label="Loan Tenure"
                        type="number"
                        id="tenure"
                        name="tenure"
                        value={formData.createUnit.tenure || ""}
                        onchange={dispatchInput}
                        placeholder="5 years"
                      />
                    </div>
                    <FormTextarea
                      name="description"
                      id="description"
                      label="Description"
                      value={formData.createUnit.description || ""}
                      onchange={dispatchInput}
                      placeholder="Write motorcycle description here"
                    />
                  </div>
                  <div className="mb-4 grid grid-cols-1 gap-y-2 border-t border-gray-300 pt-5">
                    <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Images & Colors
                    </span>
                    {rows.map((_, i) => (
                      <section key={i}>
                        <div className="flex justify-center items-center w-full">
                          <label
                            htmlFor={`dropzone_${i}`}
                            className="flex flex-col justify-center items-center w-full h-24 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                              {files.length > 0 && files[i] ? (
                                files[i].map((file) => (
                                  <span className="font-semibold dark:text-white">
                                    {file.name}
                                  </span>
                                ))
                              ) : (
                                <>
                                  <Cloud />
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      Click to upload{" "}
                                    </span>
                                    or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG or JPG (MAX. 800x400px)
                                  </p>
                                </>
                              )}
                            </div>
                            <input
                              id={`dropzone_${i}`}
                              name={`file_${i}`}
                              type="file"
                              className="hidden"
                              onChange={(e) => fileChange(e, i)}
                              multiple
                            />
                          </label>
                        </div>
                        <div className="sm:flex justify-between items-center mb-3">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">
                              Color:
                            </p>
                            {colors.length > 0 && colors[i] && (
                              <ColorLabel style={colors[i]} />
                            )}
                            <CustomBttn
                              text="Select Color"
                              onclick={() => {
                                dispatch(setColorIndex(i));
                                dispatch(
                                  toggleModal({
                                    name: "colorModal",
                                    value: modals?.colorModal,
                                  })
                                );
                                // document.getElementById(
                                //   "colorModal"
                                // ).style.display = "flex";
                              }}
                              classname="flex items-center justify-center text-rose-700 hover:text-white border border-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-rose-600 dark:border-rose-500 dark:text-rose-200 dark:hover:text-white dark:hover:bg-rose-800 dark:focus:ring-rose-900"
                            />
                          </div>
                          <QuantityInput
                            max={200}
                            label="Quantity"
                            index={i}
                            type="create-unit"
                          />
                        </div>
                      </section>
                    ))}
                    <BttnwithIcon
                      type="button"
                      text="Add Color"
                      click={() => setRows([...rows, ""])}>
                      <Plus />
                    </BttnwithIcon>
                  </div>
                </section>

                <section className="lg:w-1/2 border-l border-gray-300 lg:pl-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-5 dark:text-white">
                    Specifications
                  </h3>
                  <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                    <FormInput
                      label="Engine"
                      type="text"
                      value={formData.createUnit.engine || ""}
                      onchange={dispatchInput}
                      name="engine"
                      id="name"
                      placeholder="Single-cylinder, Parallel twin, V-twin"
                    />
                    <FormInput
                      label="Compression Ratio"
                      type="text"
                      value={formData.createUnit.compression || ""}
                      onchange={dispatchInput}
                      name="compression"
                      id="name"
                      placeholder="Efficiency/performance indicator"
                    />
                    <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                      <FormInput
                        label="Displacement (cc)"
                        type="text"
                        value={formData.createUnit.displacement || ""}
                        onchange={dispatchInput}
                        name="displacement"
                        id="name"
                        placeholder="125cc"
                      />
                      <FormInput
                        label="Horsepower (hp)"
                        type="text"
                        value={formData.createUnit.horsepower || ""}
                        onchange={dispatchInput}
                        name="horsepower"
                        id="name"
                        placeholder="Power output"
                      />
                      <FormInput
                        label="Torque (Nm)"
                        type="text"
                        value={formData.createUnit.torque || ""}
                        onchange={dispatchInput}
                        name="torque"
                        id="name"
                        placeholder="Turning force"
                      />
                      <FormInput
                        label="Fuel System"
                        type="text"
                        value={formData.createUnit.fuel || ""}
                        onchange={dispatchInput}
                        name="fuel"
                        id="name"
                        placeholder="Carburetor or Fuel injection (FI)"
                      />
                      <FormInput
                        label="Final Drive"
                        type="text"
                        value={formData.createUnit.drive || ""}
                        onchange={dispatchInput}
                        name="drive"
                        id="name"
                        placeholder="Chain, Belt, or Shaft"
                      />
                      <FormInput
                        label="Transmission"
                        type="text"
                        value={formData.createUnit.transmission || ""}
                        onchange={dispatchInput}
                        name="transmission"
                        id="name"
                        placeholder="Manual, 5-speed or 6-speed"
                      />
                    </div>
                    <FormInput
                      label="Cooling System"
                      type="text"
                      value={formData.createUnit.cooling || ""}
                      onchange={dispatchInput}
                      name="cooling"
                      id="name"
                      placeholder="Air-cooled, Liquid-cooled, Oil-cooled"
                    />
                  </div>
                  <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                    <FormInput
                      label="Front Suspension"
                      type="text"
                      value={formData.createUnit.front_suspension || ""}
                      onchange={dispatchInput}
                      name="front_suspension"
                      id="name"
                      placeholder="Telescopic forks, Inverted forks"
                    />
                    <FormInput
                      label="Rear Suspension"
                      type="text"
                      value={formData.createUnit.rear_suspension || ""}
                      onchange={dispatchInput}
                      name="rear_suspension"
                      id="name"
                      placeholder="Mono-shock or Dual shock absorbers"
                    />
                    <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                      <FormInput
                        label="Frame Type"
                        type="text"
                        value={formData.createUnit.frame || ""}
                        onchange={dispatchInput}
                        name="frame"
                        id="name"
                        placeholder="Steel trellis, Aluminum twin-spar"
                      />
                      <FormInput
                        label="Front/Rear Travel (mm/in)"
                        type="text"
                        value={formData.createUnit.travel || ""}
                        onchange={dispatchInput}
                        name="travel"
                        id="name"
                        placeholder="Suspension travel distance"
                      />
                      <FormInput
                        label="Swingarm Type"
                        type="text"
                        value={formData.createUnit.swingarm || ""}
                        onchange={dispatchInput}
                        name="swingarm"
                        id="name"
                        placeholder="Standard, Single-sided"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                    <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                      <FormInput
                        label="Dry Weight"
                        type="text"
                        value={formData.createUnit.dry_weight || ""}
                        onchange={dispatchInput}
                        name="dry_weight"
                        id="name"
                        placeholder="Without fuel/fluids"
                      />
                      <FormInput
                        label="Wet weight"
                        type="text"
                        value={formData.createUnit.wet_weight || ""}
                        onchange={dispatchInput}
                        name="wet_weight"
                        id="name"
                        placeholder="Fully fueled and ready to ride"
                      />
                      <FormInput
                        label="Seat Height (mm/in)"
                        type="text"
                        value={formData.createUnit.seat || ""}
                        onchange={dispatchInput}
                        name="seat"
                        id="name"
                        placeholder="Input seat measurements"
                      />
                      <FormInput
                        label="Wheelbase"
                        type="text"
                        value={formData.createUnit.wheelbase || ""}
                        onchange={dispatchInput}
                        name="wheelbase"
                        id="name"
                        placeholder="Distance between front and rear axle"
                      />
                      <FormInput
                        label="Fuel Tank Capacity"
                        type="text"
                        value={formData.createUnit.fuel_tank || ""}
                        onchange={dispatchInput}
                        name="fuel_tank"
                        id="name"
                        placeholder="Engine Type"
                      />
                      <FormInput
                        label="Ground Clearance"
                        type="text"
                        value={formData.createUnit.clearance || ""}
                        onchange={dispatchInput}
                        name="clearance"
                        id="name"
                        placeholder="Important for off-roading"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                    <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                      <FormInput
                        label="Tire Size"
                        type="text"
                        value={formData.createUnit.tires || ""}
                        onchange={dispatchInput}
                        name="tires"
                        id="name"
                        placeholder="120/70ZR17"
                      />
                      <FormInput
                        label="Wheel Type"
                        type="text"
                        value={formData.createUnit.wheel || ""}
                        onchange={dispatchInput}
                        name="wheel"
                        id="name"
                        placeholder="Spoke or alloy wheels"
                      />
                      <FormInput
                        label="Brakes"
                        type="text"
                        value={formData.createUnit.brakes || ""}
                        onchange={dispatchInput}
                        name="brakes"
                        id="name"
                        placeholder="Disc (single/double), ABS"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                    <FormInput
                      label="ABS"
                      type="text"
                      value={formData.createUnit.abs || ""}
                      onchange={dispatchInput}
                      name="abs"
                      id="name"
                      placeholder="Anti-lock braking system"
                    />
                    <FormInput
                      label="Traction Control"
                      type="text"
                      value={formData.createUnit.traction || ""}
                      onchange={dispatchInput}
                      name="traction"
                      id="name"
                      placeholder="Prevents wheel slip"
                    />
                    <FormInput
                      label="TFT Display"
                      type="text"
                      value={formData.createUnit.tft || ""}
                      onchange={dispatchInput}
                      name="tft"
                      id="name"
                      placeholder="TFT Digital Screen"
                    />
                    <FormInput
                      label="Lighting"
                      type="text"
                      value={formData.createUnit.lighting || ""}
                      onchange={dispatchInput}
                      name="lighting"
                      id="name"
                      placeholder="LED, Halogen, DRLs"
                    />
                    <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                      <FormInput
                        label="Riding Modes"
                        type="text"
                        value={formData.createUnit.ride_mode || ""}
                        onchange={dispatchInput}
                        name="ride_mode"
                        id="name"
                        placeholder="E.g., Sport, Rain, Touring"
                      />
                      <FormInput
                        label="Quickshifter"
                        type="text"
                        value={formData.createUnit.quickshifter || ""}
                        onchange={dispatchInput}
                        name="quickshifter"
                        id="name"
                        placeholder="Clutchless upshifts/downshifts"
                      />
                      <FormInput
                        label="Cruise Control"
                        type="text"
                        value={formData.createUnit.cruise || ""}
                        onchange={dispatchInput}
                        name="cruise"
                        id="name"
                        placeholder="For long-distance riding"
                      />
                    </div>
                  </div>
                  <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                    <Button text="Add Unit" bttnType="submit" />
                  </div>
                </section>
              </form>
              {modals?.colorModal && <ColorModal colors={colors} />}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
