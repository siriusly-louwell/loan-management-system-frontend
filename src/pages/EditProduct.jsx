import React, { useEffect, useState } from "react";
import FormInput from "../components/inputs/FormInput";
import FormTextarea from "../components/inputs/FormTextarea";
import Button from "../components/buttons/Button";
import CloseBttn from "../components/buttons/CloseBttn";
import Cloud from "../assets/icons/Cloud";
import ColorLabel from "../components/ColorLabel";
import CustomBttn from "../components/buttons/CustomBttn";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import Plus from "../assets/icons/Plus";
import Ex from "../assets/icons/Ex";
import ColorModal from "../components/modals/ColorModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlert,
  setLoading,
  toggleModal,
} from "../services/redux/slices/uiSlice";
import { UnitEntity } from "../services/entities/Unit";
import { UnitSpecsEntity } from "./../services/entities/UnitSpecs";
import {
  setColors,
  setColorIndex,
  handleChange,
  initialForm,
  setType,
  removeColor,
} from "../services/redux/slices/formSlice";
import { editUnit, fetchUnits } from "../services/redux/slices/unitSlice";
import FormSelect from "../components/inputs/FormSelect";
import PopAnimate from "../components/animations/popAnimate";

export default function EditProduct() {
  const dispatch = useDispatch();
  const unit = useSelector(UnitEntity);
  const specs = useSelector(UnitSpecsEntity);
  const { brands } = useSelector((state) => state.unit);
  const { modals } = useSelector((state) => state.ui);
  const { colors, formData } = useSelector((state) => state.form);
  const [files, setFiles] = useState([]);
  const [angles, setAngles] = useState([]);

  useEffect(() => {
    const { colors, ...unitRest } = unit;
    const { images, ...specRest } = specs;
    const colorArr = colors.map((i) => i.color);

    dispatch(setColors(colorArr));
    dispatch(setType("editUnit"));
    dispatch(initialForm({ ...unitRest, ...specRest }));
  }, []);

  useEffect(() => {
    if (Object.keys(specs).length > 0 && specs.images) {
      const images = specs.images.map((img, i) => ({
        id: img.id,
        type: img.image_type,
        url: specs.imgURL(i),
        file: null,
        status: "keep",
      }));
      const angles = images.filter((file) => file.type === "angle");
      const colors = images.filter((file) => file.type === "color");

      setFiles(colors);
      setAngles(angles);
    }
  }, [specs?.images?.length]);

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(setLoading({ isActive: true, text: "Updating data..." }));

    try {
      const form = formData.editUnit;
      const response = await dispatch(
        editUnit({ form, files, angles, colors, id: unit.id, type: "edit" })
      ).unwrap();

      dispatch(setAlert({ message: response.message, type: response.type }));
      dispatch(setLoading({ isActive: false }));
      if (response.type === "success") {
        dispatch(toggleModal({ name: "editUnit", value: modals?.editUnit }));
        dispatch(fetchUnits());
      }
    } catch (error) {
      console.error("Error: ", error);
      dispatch(setLoading({ isActive: false }));
      dispatch(
        setAlert({
          message: "Unexpected error. Something went wrong.",
          type: "error",
        })
      );
    }
  }

  function fileChange(event, i, type) {
    const file = event.target.files[0];

    if (file !== undefined) {
      const updatedFiles = type === "color" ? [...files] : [...angles];
      updatedFiles[i] = {
        id: null,
        type: type,
        url: URL.createObjectURL(file),
        file: file,
        status: "new",
      };

      if (type === "color") setFiles(updatedFiles);
      else setAngles(updatedFiles);
    }
  }

  function removeFile(index, type) {
    let fileArr;
    const images = type === "color" ? files : angles;

    if (images[index].status === "keep") {
      fileArr = [...images];
      fileArr[index] = { ...fileArr[index], status: "delete" };
    } else fileArr = images.filter((_, i) => i !== index);

    if (type === "color") {
      dispatch(removeColor(index));
      setFiles(fileArr);
    } else setAngles(fileArr);
  }

  function dispatchInput(event) {
    dispatch(
      handleChange({
        name: event.target.name,
        value: event.target.value,
        formType: "editUnit",
      })
    );
  }

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed bg-gray-400 dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-40 top-0 right-0 left-0 z-40 justify-items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
      <PopAnimate>
        <div className="relative p-4 w-full lg:w-[120vh] h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Edit Unit - #{unit.id}
              </h3>
              <CloseBttn
                trigger={() =>
                  dispatch(
                    toggleModal({
                      name: "editUnit",
                      value: modals?.editUnit,
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
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <FormInput
                    label="Motorcycle Name"
                    type="text"
                    value={formData.editUnit.name || ""}
                    onchange={(e) => dispatchInput(e)}
                    name="name"
                    id="name"
                  />
                  <FormSelect
                    label="Brand Name"
                    name="brand"
                    id="brand"
                    value={formData.createUnit.brand || ""}
                    onchange={dispatchInput}>
                    {brands.map((brand, i) => (
                      <option key={i}>{brand}</option>
                    ))}
                  </FormSelect>
                  <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                    <FormInput
                      label="Price"
                      type="number"
                      id="price"
                      name="price"
                      value={formData.editUnit.price || ""}
                      onchange={(e) => dispatchInput(e)}
                    />
                    <FormInput
                      label="Minimum Downpayment"
                      type="number"
                      id="down"
                      name="downpayment"
                      value={formData.editUnit.downpayment || ""}
                      onchange={(e) => dispatchInput(e)}
                    />
                    <FormInput
                      label="Rebate"
                      type="number"
                      id="rebate"
                      name="rebate"
                      value={formData.editUnit.rebate || ""}
                      onchange={(e) => dispatchInput(e)}
                    />
                    <FormInput
                      label="Interest Rate (%)"
                      type="number"
                      id="interest"
                      name="interest"
                      value={formData.editUnit.interest || ""}
                      onchange={(e) => dispatchInput(e)}
                    />
                    <FormInput
                      label="Loan Tenure"
                      type="number"
                      id="tenure"
                      name="tenure"
                      value={formData.editUnit.tenure || ""}
                      onchange={(e) => dispatchInput(e)}
                    />
                  </div>
                  <FormTextarea
                    name="description"
                    id="description"
                    label="Description"
                    value={formData.editUnit.description || ""}
                    onchange={(e) => dispatchInput(e)}
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
                    value={formData.editUnit.engine || ""}
                    onchange={(e) => dispatchInput(e)}
                    name="engine"
                    id="name"
                  />
                  <FormInput
                    label="Compression Ratio"
                    type="text"
                    value={formData.editUnit.compression || ""}
                    onchange={(e) => dispatchInput(e)}
                    name="compression"
                    id="name"
                  />
                  <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                    <FormInput
                      label="Displacement (cc)"
                      type="text"
                      value={formData.editUnit.displacement || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="displacement"
                      id="name"
                    />
                    <FormInput
                      label="Horsepower (hp)"
                      type="text"
                      value={formData.editUnit.horsepower || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="horsepower"
                      id="name"
                    />
                    <FormInput
                      label="Torque (Nm)"
                      type="text"
                      value={formData.editUnit.torque || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="torque"
                      id="name"
                    />
                    <FormInput
                      label="Fuel System"
                      type="text"
                      value={formData.editUnit.fuel || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="fuel"
                      id="name"
                    />
                    <FormInput
                      label="Final Drive"
                      type="text"
                      value={formData.editUnit.drive || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="drive"
                      id="name"
                    />
                    <FormInput
                      label="Transmission"
                      type="text"
                      value={formData.editUnit.transmission || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="transmission"
                      id="name"
                    />
                  </div>
                  <FormInput
                    label="Cooling System"
                    type="text"
                    value={formData.editUnit.cooling || ""}
                    onchange={(e) => dispatchInput(e)}
                    name="cooling"
                    id="name"
                  />
                </div>
                <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                  <FormInput
                    label="Front Suspension"
                    type="text"
                    value={formData.editUnit.front_suspension || ""}
                    onchange={(e) => dispatchInput(e)}
                    name="front_suspension"
                    id="name"
                  />
                  <FormInput
                    label="Rear Suspension"
                    type="text"
                    value={formData.editUnit.rear_suspension || ""}
                    onchange={(e) => dispatchInput(e)}
                    name="rear_suspension"
                    id="name"
                  />
                  <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                    <FormInput
                      label="Frame Type"
                      type="text"
                      value={formData.editUnit.frame || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="frame"
                      id="name"
                    />
                    <FormInput
                      label="Front/Rear Travel (mm/in)"
                      type="text"
                      value={formData.editUnit.travel || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="travel"
                      id="name"
                    />
                    <FormInput
                      label="Swingarm Type"
                      type="text"
                      value={formData.editUnit.swingarm || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="swingarm"
                      id="name"
                    />
                  </div>
                </div>
                <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                  <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                    <FormInput
                      label="Dry Weight"
                      type="text"
                      value={formData.editUnit.dry_weight || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="dry_weight"
                      id="name"
                    />
                    <FormInput
                      label="Wet weight"
                      type="text"
                      value={formData.editUnit.wet_weight || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="wet_weight"
                      id="name"
                    />
                    <FormInput
                      label="Seat Height (mm/in)"
                      type="text"
                      value={formData.editUnit.seat || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="seat"
                      id="name"
                    />
                    <FormInput
                      label="Wheelbase"
                      type="text"
                      value={formData.editUnit.wheelbase || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="wheelbase"
                      id="name"
                    />
                    <FormInput
                      label="Fuel Tank Capacity"
                      type="text"
                      value={formData.editUnit.fuel_tank || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="fuel_tank"
                      id="name"
                    />
                    <FormInput
                      label="Ground Clearance"
                      type="text"
                      value={formData.editUnit.clearance || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="clearance"
                      id="name"
                    />
                  </div>
                </div>
                <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                  <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                    <FormInput
                      label="Tire Size"
                      type="text"
                      value={formData.editUnit.tires || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="tires"
                      id="name"
                    />
                    <FormInput
                      label="Wheel Type"
                      type="text"
                      value={formData.editUnit.wheel || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="wheel"
                      id="name"
                    />
                    <FormInput
                      label="Brakes"
                      type="text"
                      value={formData.editUnit.brakes || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="brakes"
                      id="name"
                    />
                  </div>
                </div>
                <div className="grid gap-4 mb-5 pb-2 sm:grid-cols-2">
                  <FormInput
                    label="ABS"
                    type="text"
                    value={formData.editUnit.abs || ""}
                    onchange={(e) => dispatchInput(e)}
                    name="abs"
                    id="name"
                  />
                  <FormInput
                    label="Traction Control"
                    type="text"
                    value={formData.editUnit.traction || ""}
                    onchange={(e) => dispatchInput(e)}
                    name="traction"
                    id="name"
                  />
                  <FormInput
                    label="TFT Display"
                    type="text"
                    value={formData.editUnit.tft || ""}
                    onchange={(e) => dispatchInput(e)}
                    name="tft"
                    id="name"
                  />
                  <FormInput
                    label="Lighting"
                    type="text"
                    value={formData.editUnit.lighting || ""}
                    onchange={(e) => dispatchInput(e)}
                    name="lighting"
                    id="name"
                  />
                  <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                    <FormInput
                      label="Riding Modes"
                      type="text"
                      value={formData.editUnit.ride_mode || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="ride_mode"
                      id="name"
                    />
                    <FormInput
                      label="Quickshifter"
                      type="text"
                      value={formData.editUnit.quickshifter || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="quickshifter"
                      id="name"
                    />
                    <FormInput
                      label="Cruise Control"
                      type="text"
                      value={formData.editUnit.cruise || ""}
                      onchange={(e) => dispatchInput(e)}
                      name="cruise"
                      id="name"
                    />
                  </div>
                </div>
              </section>

              <section className="mb-4 grid grid-cols-1 gap-y-2 border-t border-gray-300 pt-5">
                <section className="flex w-full justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 mb-5 dark:text-white">
                    Images & Colors
                  </h3>
                  <BttnwithIcon
                    type="button"
                    text="Add Color"
                    click={() =>
                      setFiles([
                        ...files,
                        {
                          id: null,
                          type: "color",
                          url: null,
                          file: null,
                          status: "ignore",
                        },
                      ])
                    }>
                    <Plus />
                  </BttnwithIcon>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {files.map(
                    (file, i) =>
                      file.status !== "delete" && (
                        <section
                          key={i}
                          className="border-b border-gray-400 mb-2">
                          <label
                            htmlFor={`file_${i}`}
                            className={`flex flex-col justify-center items-center rounded-2xl w-full ${
                              file.status !== "keep" && "cursor-pointer"
                            }`}>
                            <div className="self-end mb-1">
                              <CloseBttn
                                trigger={() => removeFile(i, "color")}
                              />
                            </div>
                            {file.status !== "ignore" ? (
                              <img
                                className={`w-auto h-[15vh] object-contain rounded-2xl flex-shrink-0 ${
                                  file.status !== "keep" && "hover:opacity-80"
                                }`}
                                src={file.url}
                                alt="unit"
                              />
                            ) : (
                              <div className="flex flex-col justify-center items-center w-full h-[15vh] bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col justify-center items-center pt-5 pb-6">
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
                                </div>
                              </div>
                            )}
                            {file.status !== "keep" && (
                              <input
                                id={`file_${i}`}
                                name={`file_${i}`}
                                type="file"
                                className="hidden"
                                onChange={(e) => fileChange(e, i, "color")}
                              />
                            )}
                          </label>
                          <div className="sm:flex space-x-2 justify-between mt-3 mb-2">
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
                                }}
                                classname="flex items-center justify-center text-rose-700 hover:text-white border border-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-rose-600 dark:border-rose-500 dark:text-rose-200 dark:hover:text-white dark:hover:bg-rose-800 dark:focus:ring-rose-900"
                              />
                            </div>
                          </div>
                        </section>
                      )
                  )}
                </div>
              </section>

              <section className="mb-4 grid grid-cols-1 gap-y-2 pt-5">
                <section className="flex w-full justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 mb-5 dark:text-white">
                    Motorcycle Angles
                  </h3>
                  <BttnwithIcon
                    type="button"
                    text="Add Angle"
                    click={() =>
                      setAngles([
                        ...angles,
                        {
                          id: null,
                          type: "angle",
                          url: null,
                          file: null,
                          status: "ignore",
                        },
                      ])
                    }>
                    <Plus />
                  </BttnwithIcon>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {angles.map(
                    (file, i) =>
                      file.status !== "delete" && (
                        <section
                          key={i}
                          className="border-b border-gray-400 mb-2">
                          <label
                            htmlFor={`angle_${i}`}
                            className={`flex flex-col justify-center items-center rounded-2xl w-full ${
                              file.status !== "keep" && "cursor-pointer"
                            }`}>
                            <div className="self-end mb-1">
                              <CloseBttn
                                trigger={() => removeFile(i, "angles")}
                              />
                            </div>
                            {file.status !== "ignore" ? (
                              <img
                                className={`w-auto h-[15vh] object-contain rounded-2xl flex-shrink-0 ${
                                  file.status !== "keep" && "hover:opacity-80"
                                }`}
                                src={file.url}
                                alt="unit"
                              />
                            ) : (
                              <div className="flex flex-col justify-center items-center w-full h-[15vh] bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col justify-center items-center pt-5 pb-6">
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
                                </div>
                              </div>
                            )}
                            {file.status !== "keep" && (
                              <input
                                id={`angle_${i}`}
                                name={`angle_${i}`}
                                type="file"
                                className="hidden"
                                onChange={(e) => fileChange(e, i, "angles")}
                              />
                            )}
                          </label>
                        </section>
                      )
                  )}
                </div>
                <div className="flex items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                  <Button text="Save Changes" bttnType="submit" />
                  <CustomBttn
                    text="Move to Archive"
                    classname="flex items-center whitespace-nowrap text-rose-700 hover:text-white border border-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-rose-500 dark:text-rose-500 dark:hover:text-white dark:hover:bg-rose-600 dark:focus:ring-rose-900">
                    <Ex className="mr-1 -ml-1 w-5 h-5" />
                  </CustomBttn>
                </div>
              </section>
            </form>
            {modals.colorModal && <ColorModal colors={colors} />}
          </div>
        </div>
      </PopAnimate>
    </div>
  );
}
