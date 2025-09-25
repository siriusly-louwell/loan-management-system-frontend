import { useEffect } from "react";
import QuantityInput from "../buttons/QuantityInput";
import Button from "../buttons/Button";
import ColorLabel from "../ColorLabel";
import { useDispatch, useSelector } from "react-redux";
import { UnitEntity } from "../../services/entities/Unit";
import CloseBttn from "../buttons/CloseBttn";
import {
  setAlert,
  setLoading,
  toggleModal,
} from "../../services/redux/slices/uiSlice";
import PopAnimate from "../animations/popAnimate";
import { initialForm, setType } from "../../services/redux/slices/formSlice";
import { editUnit, fetchUnits } from "../../services/redux/slices/unitSlice";

export default function StockModal() {
  const dispatch = useDispatch();
  const unit = useSelector(UnitEntity);
  const { modals } = useSelector((state) => state.ui);
  const { formData } = useSelector((state) => state.form);

  useEffect(() => {
    dispatch(setType("unitStock"));
    dispatch(initialForm({ quantity: [1] }));
  }, []);

  async function changeStock() {
    dispatch(setLoading({ isActive: true, text: "Updating stock..." }));

    try {
      const response = await dispatch(
        editUnit({
          quantity: formData.unitStock.quantity,
          id: unit.id,
          colors: unit.colors.map((c) => c.color),
          type: "patch",
        })
      ).unwrap();

      dispatch(setAlert({ message: response.message, type: response.type }));
      dispatch(setLoading({ isActive: false }));
      dispatch(toggleModal({ name: "unitStock", value: modals?.unitStock }));
      dispatch(fetchUnits({ page: 1 }));
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
    <div className="fixed flex items-center justify-center top-0 left-0 right-0 z-40 p-20 bg-gray-400 dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-40 justify-items-center items-center overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <PopAnimate>
        <div className="relative w-full h-auto max-w-md max-h-full">
          <div className="relative flex flex-col bg-white rounded-lg shadow dark:bg-gray-800 border dark:border-gray-500">
            <div className="self-end mr-1 mt-1">
              <CloseBttn
                trigger={() =>
                  dispatch(
                    toggleModal({
                      name: "unitStock",
                      value: modals?.unitStock,
                    })
                  )
                }
              />
            </div>
            <div className="p-6 pt-0 items-center">
              <h2 className="text-lg font-semibold text-gray-900 w-full text-center pb-4 mb-4 border-b border-gray-400 dark:text-white">
                Stock Management
              </h2>
              <div className="grid sm:grid-cols-2 mb-3 gap-4">
                <div className="grid col-span-2 sm:grid-cols-2">
                  <img
                    className="h-26 w-28 rounded-lg object-cover"
                    src={unit.imgURL()}
                    alt="unit"
                  />
                  <p className="flex items-center text-lg font-bold leading-none text-gray-900 dark:text-white">
                    {unit.name}
                  </p>
                </div>
                <p className="dark:text-white">Current Stock: </p>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {unit.quantity}
                </span>
                {unit?.colors?.map((color, i) => (
                  <div
                    key={i}
                    className="grid col-span-2 grid-cols-3 border-t border-gray-400">
                    <p className="mt-5 dark:text-white">Color:</p>
                    <div className="mt-5">
                      <ColorLabel style={color.color} size={7} />
                    </div>
                    <QuantityInput
                      max={200}
                      index={i}
                      initial={color.quantity}
                    />
                  </div>
                ))}
              </div>
              <Button text="Done" onclick={changeStock} />
            </div>
          </div>
        </div>
      </PopAnimate>
    </div>
  );
}
