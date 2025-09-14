import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FormInput from "../components/inputs/FormInput";
import FormTextarea from "../components/inputs/FormTextarea";
import Button from "../components/buttons/Button";
import CloseBttn from "../components/buttons/CloseBttn";
import Cloud from "../assets/icons/Cloud";
import Spinner from "../components/loading components/Spinner";
import SelectColor from "../components/checkboxes/SelectColor";
import ColorLabel from "../components/ColorLabel";
import Alert from "../components/Alert";
import CustomBttn from "../components/buttons/CustomBttn";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import Plus from "../assets/icons/Plus";
import Ex from "../assets/icons/Ex";
import axios from "axios";
import ColorModal from "../components/modals/ColorModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../services/redux/slices/uiSlice";
import { UnitEntity } from "../services/entities/Unit";
import { UnitSpecsEntity } from "./../services/entities/UnitSpecs";
import FileInput from "../components/inputs/FileInput";
import { setColors, setColorIndex } from "../services/redux/slices/formSlice";

export default function EditProduct({ motor }) {
  const dispatch = useDispatch();
  const unit = useSelector(UnitEntity);
  const specs = useSelector(UnitSpecsEntity);
  const { modals } = useSelector((state) => state.ui);
  const { colors } = useSelector((state) => state.form);
  const [files, setFiles] = useState([]);
  const [formEdit, setFormEdit] = useState({});
  const [editColor, setEditColor] = useState([]);
  const [alert, setAlert] = useState({});
  const [rows, setRows] = useState([""]);
  // const [colorIndex, setColorIndex] = useState();

  useEffect(() => {
    // if (Object.keys(motor).length > 0) {
    //   const colorArr = motor.colors.map((i) => i.color);
    //   // delete motor.colors;
    //   delete motor.images;

    //   setEditColor(colorArr);
    //   setRows(colorArr);
    //   setFormEdit(motor);
    // }
    const colorArr = unit.colors.map((i) => i.color);
    dispatch(setColors(colorArr));
  }, []);

  function changeEditColor(newColor) {
    // const updatedColors = editColor.includes(newColor)
    //     ? editColor.filter(color => color !== newColor)
    //     : [...editColor, newColor];

    // setEditColor(updatedColors);

    const updatedColors = [...editColor];

    // if (updatedColors[colorIndex] === newColor)
    //   updatedColors[colorIndex] = null;
    // else updatedColors[colorIndex] = newColor;

    setEditColor(updatedColors);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const editData = new FormData();

    if (files.length > 0) {
      files.forEach((file) => editData.append("files[]", file));
    }

    for (const key in formEdit) {
      editData.append(key, formEdit[key]);
    }

    editData.append("_method", "PATCH");
    editColor.forEach((color) => editData.append(`colors[]`, color));
    document.getElementById("edit_unit").style.display = "flex";

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/motorcycle/${formEdit.id}`,
        editData
      );

      console.log("Success: ", response.data.message);
      document.getElementById("edit_unit").style.display = "none";
      setAlert({
        text: "Unit updated succcessfully!",
        icon: "done",
      });
      resetInput();
    } catch (error) {
      console.error("Error: ", error);
      setAlert({
        text: "Failed to update data",
        icon: "warn",
      });
      document.getElementById("edit_unit").style.display = "none";
      document.getElementById("editUnit").style.display = "block";
    }
  }

  function resetInput() {
    setFormEdit({});
    setEditColor([]);
    setFiles([]);
    document.getElementById("editUnit").style.display = "block";
  }

  function fileChange(event, i) {
    const updatedFiles = [...files];
    updatedFiles[i] = [...event.target.files];

    setFiles(updatedFiles);
    // setFiles([...event.target.files]);
    // setFiles(event.target.files[0]);
  }

  function handleChange(event) {
    setFormEdit({
      ...formEdit,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed bg-gray-400 dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-40 top-0 right-0 left-0 z-50 justify-items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
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
              <form onSubmit={handleSubmit} className="lg:flex">
                <section className="lg:w-1/2 lg:pr-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-5 dark:text-white">
                    Motorcycle Details
                  </h3>
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <FormInput
                      label="Motorcycle Name"
                      type="text"
                      value={unit.name || ""}
                      onchange={handleChange}
                      name="name"
                      id="name"
                    />
                    <FormInput
                      label="Brand Name"
                      type="text"
                      name="brand"
                      id="brand"
                      value={unit.brand || ""}
                      onchange={handleChange}
                    />
                    <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                      <FormInput
                        label="Price"
                        type="number"
                        id="price"
                        name="price"
                        value={unit.price || ""}
                        onchange={handleChange}
                      />
                      <FormInput
                        label="Minimum Downpayment"
                        type="number"
                        id="down"
                        name="downpayment"
                        value={unit.downpayment || ""}
                        onchange={handleChange}
                      />
                      <FormInput
                        label="Rebate"
                        type="number"
                        id="rebate"
                        name="rebate"
                        value={unit.rebate || ""}
                        onchange={handleChange}
                      />
                      <FormInput
                        label="Interest Rate (%)"
                        type="number"
                        id="interest"
                        name="interest"
                        value={unit.interest || ""}
                        onchange={handleChange}
                      />
                      <FormInput
                        label="Loan Tenure"
                        type="number"
                        id="tenure"
                        name="tenure"
                        value={unit.tenure || ""}
                        onchange={handleChange}
                      />
                    </div>
                    <FormTextarea
                      name="description"
                      id="description"
                      label="Description"
                      value={unit.description || ""}
                      onchange={handleChange}
                    />
                  </div>
                  <div className="mb-4 grid grid-cols-1 gap-y-2 border-t border-gray-300 pt-5">
                    <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Images & Colors
                    </span>
                    {specs.images.map((_, i) => (
                      <section
                        key={i}
                        className="border-b border-gray-400 mb-2">
                        <div className="flex justify-center items-center w-full">
                          <img
                            className="w-auto h-[30vh] object-contain rounded-lg flex-shrink-0"
                            src={specs.imgURL(i)}
                            alt="unit"
                          />
                          {/* <section className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 dark:bg-gray-700 dark:border-gray-600">
                            <div className="flex flex-col justify-center items-center py-2">
                              {files.length > 0 && files[i] ? (
                                // <span className="font-semibold dark:text-white">{files.name}</span>
                                files[i].map((file, i) => (
                                  <span
                                    key={i}
                                    className="font-semibold dark:text-white">
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
                        </section> */}
                        </div>
                        <div className="sm:flex space-x-2 justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">
                              Color:
                            </p>
                            {colors.length > 0 && <ColorLabel style={colors[i]} />}
                            <CustomBttn
                              text="Select Color"
                              onclick={() => {
                                // setColorIndex(i);
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
                          <FileInput
                            label="Change Photo"
                            name={`file_${i}`}
                            type="img"
                            change={(e) => fileChange(e, i)}
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

                <section className="lg:w-1/2 lg:border-l border-gray-300 lg:pl-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-5 dark:text-white">
                    Specifications
                  </h3>
                  <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                    <FormInput
                      label="Engine"
                      type="text"
                      value={specs.engine || ""}
                      onchange={handleChange}
                      name="engine"
                      id="name"
                    />
                    <FormInput
                      label="Compression Ratio"
                      type="text"
                      value={specs.compression || ""}
                      onchange={handleChange}
                      name="compression"
                      id="name"
                    />
                    <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                      <FormInput
                        label="Displacement (cc)"
                        type="text"
                        value={specs.displacement || ""}
                        onchange={handleChange}
                        name="displacement"
                        id="name"
                      />
                      <FormInput
                        label="Horsepower (hp)"
                        type="text"
                        value={specs.horsepower || ""}
                        onchange={handleChange}
                        name="horsepower"
                        id="name"
                      />
                      <FormInput
                        label="Torque (Nm)"
                        type="text"
                        value={specs.torque || ""}
                        onchange={handleChange}
                        name="torque"
                        id="name"
                      />
                      <FormInput
                        label="Fuel System"
                        type="text"
                        value={specs.fuel || ""}
                        onchange={handleChange}
                        name="fuel"
                        id="name"
                      />
                      <FormInput
                        label="Final Drive"
                        type="text"
                        value={specs.drive || ""}
                        onchange={handleChange}
                        name="drive"
                        id="name"
                      />
                      <FormInput
                        label="Transmission"
                        type="text"
                        value={specs.transmission || ""}
                        onchange={handleChange}
                        name="transmission"
                        id="name"
                      />
                    </div>
                    <FormInput
                      label="Cooling System"
                      type="text"
                      value={specs.cooling || ""}
                      onchange={handleChange}
                      name="cooling"
                      id="name"
                    />
                  </div>
                  <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                    <FormInput
                      label="Front Suspension"
                      type="text"
                      value={specs.front_suspension || ""}
                      onchange={handleChange}
                      name="front_suspension"
                      id="name"
                    />
                    <FormInput
                      label="Rear Suspension"
                      type="text"
                      value={specs.rear_suspension || ""}
                      onchange={handleChange}
                      name="rear_suspension"
                      id="name"
                    />
                    <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                      <FormInput
                        label="Frame Type"
                        type="text"
                        value={specs.frame || ""}
                        onchange={handleChange}
                        name="frame"
                        id="name"
                      />
                      <FormInput
                        label="Front/Rear Travel (mm/in)"
                        type="text"
                        value={specs.travel || ""}
                        onchange={handleChange}
                        name="travel"
                        id="name"
                      />
                      <FormInput
                        label="Swingarm Type"
                        type="text"
                        value={specs.swingarm || ""}
                        onchange={handleChange}
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
                        value={specs.dry_weight || ""}
                        onchange={handleChange}
                        name="dry_weight"
                        id="name"
                      />
                      <FormInput
                        label="Wet weight"
                        type="text"
                        value={specs.wet_weight || ""}
                        onchange={handleChange}
                        name="wet_weight"
                        id="name"
                      />
                      <FormInput
                        label="Seat Height (mm/in)"
                        type="text"
                        value={specs.seat || ""}
                        onchange={handleChange}
                        name="seat"
                        id="name"
                      />
                      <FormInput
                        label="Wheelbase"
                        type="text"
                        value={specs.wheelbase || ""}
                        onchange={handleChange}
                        name="wheelbase"
                        id="name"
                      />
                      <FormInput
                        label="Fuel Tank Capacity"
                        type="text"
                        value={specs.fuel_tank || ""}
                        onchange={handleChange}
                        name="fuel_tank"
                        id="name"
                      />
                      <FormInput
                        label="Ground Clearance"
                        type="text"
                        value={specs.clearance || ""}
                        onchange={handleChange}
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
                        value={specs.tires || ""}
                        onchange={handleChange}
                        name="tires"
                        id="name"
                      />
                      <FormInput
                        label="Wheel Type"
                        type="text"
                        value={specs.wheel || ""}
                        onchange={handleChange}
                        name="wheel"
                        id="name"
                      />
                      <FormInput
                        label="Brakes"
                        type="text"
                        value={specs.brakes || ""}
                        onchange={handleChange}
                        name="brakes"
                        id="name"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 mb-5 pb-2 border-b sm:grid-cols-2">
                    <FormInput
                      label="ABS"
                      type="text"
                      value={specs.abs || ""}
                      onchange={handleChange}
                      name="abs"
                      id="name"
                    />
                    <FormInput
                      label="Traction Control"
                      type="text"
                      value={specs.traction || ""}
                      onchange={handleChange}
                      name="traction"
                      id="name"
                    />
                    <FormInput
                      label="TFT Display"
                      type="text"
                      value={specs.tft || ""}
                      onchange={handleChange}
                      name="tft"
                      id="name"
                    />
                    <FormInput
                      label="Lighting"
                      type="text"
                      value={specs.lighting || ""}
                      onchange={handleChange}
                      name="lighting"
                      id="name"
                    />
                    <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-3">
                      <FormInput
                        label="Riding Modes"
                        type="text"
                        value={specs.ride_mode || ""}
                        onchange={handleChange}
                        name="ride_mode"
                        id="name"
                      />
                      <FormInput
                        label="Quickshifter"
                        type="text"
                        value={specs.quickshifter || ""}
                        onchange={handleChange}
                        name="quickshifter"
                        id="name"
                      />
                      <FormInput
                        label="Cruise Control"
                        type="text"
                        value={specs.cruise || ""}
                        onchange={handleChange}
                        name="cruise"
                        id="name"
                      />
                    </div>
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
              <Spinner id="edit_unit" text="Saving data..." />
              <Alert id="editUnit" text={alert.text} icon={alert.icon}>
                <Button
                  text="Ok"
                  onclick={() => {
                    if (alert.icon === "done")
                      document.getElementById("editProduct").style.display =
                        "none";
                    document.getElementById("editUnit").style.display = "none";
                  }}
                />
              </Alert>
              {modals.colorModal && (
                <ColorModal colors={editColor} changeColor={changeEditColor} />
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
