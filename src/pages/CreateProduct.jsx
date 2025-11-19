import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUnit, fetchUnits } from "../services/redux/slices/unitSlice";
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
import PopAnimate from "../components/animations/popAnimate";
import {
  setLoading,
  setAlert,
  toggleModal,
} from "../services/redux/slices/uiSlice";
import {
  setColorIndex,
  resetInput,
  handleChange,
  initialForm,
  setType,
} from "../services/redux/slices/formSlice";
import FormCheck from "../components/checkboxes/FormCheck";
import { number } from "framer-motion";

export default function CreateProduct() {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);
  const { brands } = useSelector((state) => state.unit);
  const { colors, formData, formType, colorIndex } = useSelector(
    (state) => state.form
  );

  const [selectedColor, setSelectedColor] = useState({
    index: 0,
    field: "",
    value: "",
  });

  const [colorGroups, setColorGroups] = useState([]);
  // Example:
  // [
  //   { color: "#FF0000", quantity: 3, images: [] }
  // ]
  function addColorRow() {
    setColorGroups((prev) => [...prev, { color: "", quantity: 1, images: [] }]);
  }
  function updateColorValue(index, field, value) {
    console.log("updateColorValue called with:", index, field, value);

    setColorGroups((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  }

  function handleFileUpload(event, index) {
    const uploadedFiles = Array.from(event.target.files);

    setColorGroups((prev) => {
      const updated = [...prev];
      if (!updated[index].images) updated[index].images = [];

      // Avoid duplicate uploads
      const newFiles = uploadedFiles.filter(
        (file) => !updated[index].images.some((f) => f.name === file.name)
      );

      updated[index].images = [...updated[index].images, ...newFiles];

      return updated;
    });
  }

  useEffect(() => {
    console.log(colorGroups);
  }, [colorGroups]);

  useEffect(() => {
    if (modals.createUnit) {
      dispatch(setType("createUnit"));
      dispatch(initialForm({ quantity: [1], unit_type: "new" }));

      // Reset colors & images
      setColorGroups([]);
    }
  }, [modals.createUnit]);

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(setLoading({ isActive: true, text: "Saving data..." }));

    try {
      const form = formData[formType];
      const formDataToSend = new FormData();
      // Append simple fields
      Object.entries(form).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      console.log("not here: 1");
      // Append colors & images

      colorGroups.forEach((group, index) => {
        if (!group.color)
          throw new Error(`Color selection is required for row ${index + 1}`);
        if (!group.images) group.images = [];
        if (!group.quantity) group.quantity = 1;

        formDataToSend.append(`colors[${index}][hex_value]`, group.color);
        formDataToSend.append(`colors[${index}][quantity]`, group.quantity);

        // Append each image correctly
        group.images.forEach((file) => {
          // Important: Use "colors[index][images][]" NOT "colors[index][images][i]"
          formDataToSend.append(`colors[${index}][images][]`, file);
        });
      });
      console.log("not here: 2");

      // Make API call using your thunk
      const response = await dispatch(addUnit(formDataToSend)).unwrap();
      console.log("not here: 3");

      dispatch(setLoading({ isActive: false }));
      dispatch(setAlert({ message: response.message, type: response.type }));
      if (response.type === "success") {
        dispatch(resetInput());
        setColorGroups([]);
        dispatch(fetchUnits({ page: 1 }));
      }
      console.log("not here: 4");
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

  function removeImage(colorIndex, imageIndex) {
    setColorGroups((prev) => {
      const updated = [...prev];
      updated[colorIndex].images = updated[colorIndex].images.filter(
        (_, i) => i !== imageIndex
      );
      return updated;
    });
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
  function removeColorRow(index) {
    setColorGroups((prev) => prev.filter((_, i) => i !== index));
  }
  const saveColor = (colorIndex, selectedColor) => {
    updateColorValue({
      index: colorIndex,
      field: "color",
      value: selectedColor, // value picked in modal
    });
  };
  return (
    <>
      <PopAnimate
        modalName={modals.createUnit}
        overflow={true}
        classStyle="relative p-4 w-full lg:w-[120vh] h-full md:h-auto"
      >
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add Unit
            </h3>
            <CloseBttn
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
          <form onSubmit={handleSubmit} className="w-full">
            <section className="lg:pr-3">
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
                    require={true}
                  />
                </div>
                <section className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white ">
                    Unit type <strong className="text-rose-500">*</strong>
                  </label>
                  <div className="flex space-x-8">
                    <FormCheck
                      id="new"
                      type="radio"
                      name="unit_type"
                      value="new"
                      label="Brand new"
                      require={true}
                      check={formData.createUnit.unit_type === "new"}
                      change={dispatchInput}
                    />
                    <FormCheck
                      id="repo"
                      type="radio"
                      name="unit_type"
                      value="repo"
                      label="Repo unit"
                      change={dispatchInput}
                    />
                  </div>
                </section>
              </div>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                  <FormSelect
                    label="Brand Name"
                    name="brand"
                    id="brand"
                    value={formData.createUnit.brand || ""}
                    require={true}
                    onchange={dispatchInput}
                  >
                    {brands.map((brand, i) => (
                      <option key={i} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </FormSelect>
                  <FormInput
                    label="Price"
                    type="number"
                    id="price"
                    name="price"
                    value={formData.createUnit.price || ""}
                    onchange={dispatchInput}
                    placeholder="₱150,000"
                    require={true}
                  />
                  <FormInput
                    label="Minimum Downpayment"
                    type="number"
                    id="down"
                    name="downpayment"
                    value={formData.createUnit.downpayment || ""}
                    onchange={dispatchInput}
                    placeholder="₱25,000"
                    require={true}
                  />
                  <FormInput
                    label="Rebate"
                    type="number"
                    id="rebate"
                    name="rebate"
                    value={formData.createUnit.rebate || ""}
                    onchange={dispatchInput}
                    placeholder="₱15,000"
                    require={true}
                  />
                  <FormInput
                    label="Interest Rate (%)"
                    type="number"
                    id="interest"
                    name="interest"
                    value={formData.createUnit.interest || ""}
                    onchange={dispatchInput}
                    placeholder="10%"
                    require={true}
                  />
                  <FormInput
                    label="Loan Tenure"
                    type="number"
                    id="tenure"
                    name="tenure"
                    value={formData.createUnit.tenure || ""}
                    onchange={dispatchInput}
                    placeholder="5 years"
                    require={true}
                  />
                </div>
                <FormTextarea
                  name="description"
                  id="description"
                  label="Description"
                  value={formData.createUnit.description || ""}
                  onchange={dispatchInput}
                  placeholder="Write motorcycle description here"
                  require={true}
                />
              </div>
            </section>

            <section className="lg:pl-3">
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
              <div className="grid gap-4 mb-5 pb-2 sm:grid-cols-2">
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
            </section>
            {/* Temporary Code -> need to be tested */}
            {true && (
              <section className="mb-4 gap-y-2 border-t border-gray-300 pt-5">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-200">
                    Unit Images
                  </h3>

                  {colorGroups.map((_, i) => (
                    <>
                      <div className="border rounded-md p-4 space-y-4 relative">
                        {/* Remove button */}
                        <button
                          className="absolute right-2 top-2 text-lg"
                          onClick={() => removeColorRow(i)}
                        >
                          ✕
                        </button>
                        {/* Upload Box */}
                        <label className="w-full border-2 border-dashed rounded-md p-6 flex flex-col items-center cursor-pointer">
                          <span>Click to upload or drag and drop</span>
                          <span className="text-sm text-gray-500">
                            SVG, PNG or JPG (MAX. 800×400)
                          </span>
                          <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, i)}
                          />
                        </label>
                        {/* List uploaded images */}
                        {colorGroups[i]?.images &&
                          colorGroups[i].images.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-2">
                              {colorGroups[i].images.map((file, index) => (
                                <div key={index} className="w-20 h-20">
                                  <img
                                    alt="images"
                                    src={URL.createObjectURL(file)}
                                    className="w-full h-full object-cover rounded"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        {/* Color + Quantity Row */}
                        <div className="flex items-center gap-6">
                          {/* Color Picker */}
                          <div>
                            <label className="text-sm font-semibold">
                              Color
                            </label>
                            <div className="flex items-center gap-2 mt-1">
                              {colorGroups.length > 0 && colorGroups[i] && (
                                <ColorLabel style={colorGroups[i].color} />
                              )}
                              <CustomBttn
                                text="Select Color"
                                onclick={() => {
                                  // store which row we are editing
                                  dispatch(setColorIndex(i));

                                  // open modal
                                  dispatch(
                                    toggleModal({
                                      name: "colorModal",
                                      value: modals?.colorModal,
                                    })
                                  );
                                }}
                                classname="flex items-center justify-center text-rose-700 hover:text-white border border-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-rose-600 dark:border-rose-500 dark:text-rose-200 dark:hover:text-white dark:hover:bg-rose-800 dark:focus:ring-rose-900"
                              />
                            </div>
                          </div>

                          {/* Quantity */}
                          <div>
                            <label className="text-sm font-semibold">
                              Quantity
                            </label>
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                type="button"
                                className="px-3 py-1 border rounded"
                                onClick={(e) =>
                                  updateColorValue(
                                    i,
                                    "quantity",
                                    colorGroups[i].quantity - 1
                                  )
                                }
                              >
                                -
                              </button>

                              {/* <span>{data.quantity} 1</span> */}
                              <span> {colorGroups[i].quantity}</span>
                              <button
                                type="button"
                                className="px-3 py-1 border rounded"
                                onClick={(e) =>
                                  updateColorValue(
                                    i,
                                    "quantity",
                                    colorGroups[i].quantity + 1
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}

                  <BttnwithIcon
                    type="button"
                    text="Add Color Availability"
                    click={() => {
                      addColorRow();
                    }}
                  >
                    <Plus />
                  </BttnwithIcon>
                </div>{" "}
              </section>
            )}

            <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <Button text="Add Unit" bttnType="submit" />
            </div>
          </form>
        </div>
      </PopAnimate>
      {modals?.colorModal && (
        <ColorModal
          colors={colorGroups}
          onSelectColor={(hex) => {
            // colorIndex comes from redux (set earlier when opening modal)
            // guard: if undefined, do nothing (avoid runtime error)
            if (typeof colorIndex === "number") {
              updateColorValue(colorIndex, "color", hex);
            } else {
              console.warn(
                "colorIndex is undefined — cannot update colorGroups"
              );
            }
          }}
        />
      )}{" "}
    </>
  );
}
