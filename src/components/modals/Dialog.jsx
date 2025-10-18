import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseBttn from "../buttons/CloseBttn";
import { toggleModal } from "../../services/redux/slices/uiSlice";
import PopAnimate from "../animations/popAnimate";

export default function Dialog({ text, children, icon, modalName }) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);

  return (
    <PopAnimate
      modalName={modals[modalName]}
      classStyle="relative w-full h-auto max-w-md max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border dark:border-gray-500">
        <div className="flex justify-right pt-1 pr-1">
          <CloseBttn
            trigger={() =>
              dispatch(
                toggleModal({ name: modalName, value: modals[modalName] })
              )
            }
          />
        </div>
        <div className="p-6 text-center">
          {icon}
          <h3 className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-100">
            {text}
          </h3>
          {children}
        </div>
      </div>
    </PopAnimate>
  );
}
