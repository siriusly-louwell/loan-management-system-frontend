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
  resetInput,
} from "../services/redux/slices/formSlice";
import {
  clearUnit,
  editUnit,
  fetchUnits,
} from "../services/redux/slices/unitSlice";
import FormSelect from "../components/inputs/FormSelect";
import PopAnimate from "../components/animations/popAnimate";
import FormCheck from "../components/checkboxes/FormCheck";

export default function EditProduct() {
  const dispatch = useDispatch();
  const unit = useSelector(UnitEntity);
  const specs = useSelector(UnitSpecsEntity);

  const { brands } = useSelector((state) => state.unit);
  const { modals } = useSelector((state) => state.ui);
  const {
    colors: reduxColors,
    formData,
    colorIndex,
  } = useSelector((state) => state.form);

  // colorGroups: same shape as CreateProduct
  const [colorGroups, setColorGroups] = useState([]);
  // track ids of old images user removed
  const [imagesToDelete, setImagesToDelete] = useState([]);

  useEffect(() => {
    if (!modals.editUnit) return;

    // 1. Set type only once
    dispatch(setType("editUnit"));

    // 2. Initialize form using the unit/specs snapshot AT THE MOMENT the modal opened
    const { colors: _colors, images, ...unitRest } = unit;
    const { images: specImages, ...specRest } = specs;
    dispatch(initialForm({ ...unitRest, ...specRest }));

    // 3. Build color groups only once per open
    if (Array.isArray(unit.colors)) {
      const groups = unit.colors.map((c) => {
        const imgs = Array.isArray(c.images)
          ? c.images.map((img) => ({
              id: img.id,
              path: img.path,
              preview: img.path ? `/${img.path}` : null,
              status: "keep",
            }))
          : [];

        return {
          color: c.hex_value,
          quantity: c.quantity,
          images: imgs,
          color_id: c.id,
        };
      });

      setColorGroups(groups);
      dispatch(setColors(unit.colors.map((c) => c.hex_value)));
    } else {
      setColorGroups([]);
    }

    // 4. Reset deleted images list
    setImagesToDelete([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modals.editUnit]); // 👈 ONLY depend on modal open/close

  if (!modals.editUnit || !unit) return null;

  // Helpers (mirrors CreateProduct)
  function addColorRow() {
    setColorGroups((prev) => [...prev, { color: "", quantity: 1, images: [] }]);
  }

  function updateColorValue(index, field, value) {
    setColorGroups((prev) => {
      const updated = [...prev];
      // guard: ensure row exists
      if (!updated[index]) return prev;
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  function handleFileUpload(event, index) {
    const uploadedFiles = Array.from(event.target.files);
    if (!uploadedFiles.length) return;

    setColorGroups((prev) => {
      const updated = [...prev];
      if (!updated[index]) return prev;
      if (!updated[index].images) updated[index].images = [];

      // convert each File to an object with file + preview + status
      const newFiles = uploadedFiles
        .filter(
          (file) =>
            !updated[index].images.some(
              (f) =>
                // If existing image is 'new', compare by name; for 'keep' compare by id/path
                (f.status === "new" && f.file && f.file.name === file.name) ||
                (f.status === "keep" && f.path && f.path.includes(file.name))
            )
        )
        .map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          status: "new",
        }));

      updated[index].images = [...updated[index].images, ...newFiles];
      return updated;
    });
  }

  function removeImage(colorIndex, imageIndex) {
    setColorGroups((prev) => {
      const updated = [...prev];
      if (!updated[colorIndex]) return prev;
      const image = updated[colorIndex].images[imageIndex];
      if (!image) return prev;

      // if it's an existing image (status keep and has id), track for deletion
      if (image.status === "keep" && image.id) {
        setImagesToDelete((prevDel) => [...prevDel, image.id]);
      }

      // remove from array
      updated[colorIndex].images = updated[colorIndex].images.filter(
        (_, i) => i !== imageIndex
      );
      return updated;
    });
  }

  function removeColorRow(index) {
    setColorGroups((prev) => prev.filter((_, i) => i !== index));
    // also remove corresponding redux color if present
    dispatch(removeColor(index));
  }

  // dispatch form input
  function dispatchInput(event) {
    dispatch(
      handleChange({
        name: event.target.name,
        value: event.target.value,
        formType: "editUnit",
      })
    );
  }

  function closeModal() {
    dispatch(clearUnit());
    dispatch(resetInput());
    dispatch(toggleModal({ name: "editUnit", value: modals?.editUnit }));
  }

  // Submit similar to CreateProduct but includes imagesToDelete and unit id
  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(setLoading({ isActive: true, text: "Updating data..." }));

    try {
      const form = formData.editUnit;
      const formDataToSend = new FormData();

      // Append simple fields
      Object.entries(form).forEach(([key, value]) => {
        // arrays should be appended differently - but we keep simple fields as strings
        formDataToSend.append(key, value ?? "");
      });
      console.log("here: 1");

      // Append colors & images
      colorGroups.forEach((group, index) => {
        if (!group.color)
          throw new Error(`Color selection is required for row ${index + 1}`);
        if (!group.images) group.images = [];
        if (!group.quantity) group.quantity = 1;

        formDataToSend.append(`colors[${index}][hex_value]`, group.color);
        formDataToSend.append(
          `colors[${index}][quantity]`,
          String(group.quantity)
        );

        console.log("here: 2");

        // Append only new files for upload
        (group.images || []).forEach((img) => {
          if (img.status === "new" && img.file) {
            formDataToSend.append(`colors[${index}][images][]`, img.file);
          }
        });

        // If you want to send color_id for existing color rows, include it (optional)
        if (group.color_id) {
          formDataToSend.append(`colors[${index}][id]`, String(group.color_id));
        }
      });
      console.log("here: 3");

      // Append IDs of images to delete (existing images user removed)
      imagesToDelete.forEach((id) => {
        formDataToSend.append("imagesToDelete[]", String(id));
      });

      // Include unit id and type so the backend knows we are editing
      formDataToSend.append("id", String(unit.id));
      formDataToSend.append("type", "edit");

      // Optional: totalQuantity (sum of quantities) — backend may expect integer
      const totalQuantity = colorGroups.reduce(
        (sum, g) => sum + (Number(g.quantity) || 0),
        0
      );
      formDataToSend.append("totalQuantity", String(totalQuantity));
      console.log("here: 4");

      const response = await dispatch(editUnit(formDataToSend)).unwrap();

      dispatch(setLoading({ isActive: false }));
      dispatch(setAlert({ message: response.message, type: response.type }));
      console.log("here: 5");

      if (response.type === "success") {
        console.log("here : 6");
        dispatch(fetchUnits({ page: 1 }));
        closeModal();
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

  return (
    <PopAnimate
      modalName={modals.editUnit}
      overflow={true}
      classStyle="relative p-4 w-full lg:w-[120vh] h-full md:h-auto"
    >
      {modals.editUnit && unit && (
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Unit - #{unit.id}
            </h3>
            <CloseBttn trigger={closeModal} />
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
                    value={formData.editUnit.name || ""}
                    onchange={(e) => dispatchInput(e)}
                    name="name"
                    id="name"
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
                      check={formData.editUnit.unit_type === "new"}
                      change={(e) => dispatchInput(e)}
                    />
                    <FormCheck
                      id="repo"
                      type="radio"
                      name="unit_type"
                      value="repo"
                      label="Repo unit"
                      check={formData.editUnit.unit_type === "repo"}
                      change={(e) => dispatchInput(e)}
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
                    value={formData.editUnit.brand || ""}
                    onchange={dispatchInput}
                  >
                    {brands.map((brand, i) => (
                      <option key={i}>{brand}</option>
                    ))}
                  </FormSelect>
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

            <section className="mb-4 gap-y-2 border-t border-gray-300 pt-5">
              <div className="space-y-6">
                <section className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Unit Images</h3>
                  <BttnwithIcon
                    type="button"
                    text="Add Color Availability"
                    click={() => addColorRow()}
                  >
                    <Plus />
                  </BttnwithIcon>
                </section>

                {colorGroups.map((group, i) => (
                  <div
                    key={i}
                    className="border rounded-md p-4 space-y-4 relative"
                  >
                    <button
                      type="button"
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

                    {/* List uploaded / existing images */}
                    {group.images && group.images.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-2">
                        {group.images.map((img, index) => (
                          <div key={index} className="w-20 h-20 relative">
                            <img
                              alt="images"
                              src={
                                `${process.env.REACT_APP_API_URL}/storage${img.preview}` ||
                                (img.path
                                  ? `${process.env.REACT_APP_API_URL}/storage/${img.path}`
                                  : "")
                              }
                              className="w-full h-full object-cover rounded"
                            />
                            <button
                              type="button"
                              className="absolute -top-1 -right-1 bg-white rounded-full p-0.5"
                              onClick={() => removeImage(i, index)}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Color + Quantity Row */}
                    <div className="flex items-center gap-6">
                      <div>
                        <label className="text-sm font-semibold">Color</label>
                        <div className="flex items-center gap-2 mt-1">
                          {colorGroups.length > 0 && colorGroups[i] && (
                            <ColorLabel style={colorGroups[i].color} />
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

                      <div>
                        <label className="text-sm font-semibold">
                          Quantity
                        </label>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            type="button"
                            className="px-3 py-1 border rounded"
                            onClick={() =>
                              updateColorValue(
                                i,
                                "quantity",
                                (Number(group.quantity) || 1) - 1
                              )
                            }
                          >
                            -
                          </button>
                          <span>{group.quantity}</span>
                          <button
                            type="button"
                            className="px-3 py-1 border rounded"
                            onClick={() =>
                              updateColorValue(
                                i,
                                "quantity",
                                (Number(group.quantity) || 1) + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <Button text="Save Changes" bttnType="submit" />
              <CustomBttn
                text="Move to Archive"
                classname="flex items-center whitespace-nowrap text-rose-700 hover:text-white border border-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-rose-500 dark:text-rose-500 dark:hover:text-white dark:hover:bg-rose-600 dark:focus:ring-rose-900"
              >
                <Ex className="mr-1 -ml-1 w-5 h-5" />
              </CustomBttn>
            </div>
          </form>

          {modals.colorModal && (
            <ColorModal
              colors={colorGroups}
              onSelectColor={(hex) => {
                if (typeof colorIndex === "number") {
                  updateColorValue(colorIndex, "color", hex);
                } else {
                  console.warn(
                    "colorIndex is undefined — cannot update colorGroups"
                  );
                }
              }}
            />
          )}
        </div>
      )}
    </PopAnimate>
  );
}
