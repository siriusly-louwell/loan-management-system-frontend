import React from "react";
import Exclamation from "../assets/icons/Exclamation";
import Ex from "../assets/icons/Ex";
import Check from "../assets/icons/Check";
import { useLocation } from "react-router-dom";

export default function Alert({ id, text, children, icon }) {
  const location = useLocation();
  return (
    <div
      id={id}
      tabIndex="-1"
      className={`fixed ${
        id !== "stock_adjust" ? "hidden" : ""
      } top-0 left-0 right-0 z-50 p-20 bg-gray-500 bg-opacity-30 dark:bg-gray-800 dark:bg-opacity-60 justify-items-center items-center overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
      <div className="relative w-full h-auto max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border dark:border-gray-500">
          {location.pathname !== "/customer/apply/comakerform" ? (
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="delete-modal"
              onClick={() =>
                (document.getElementById(id).style.display = "none")
              }>
              <Ex className="w-5 h-5" />
              <span className="sr-only">Close modal</span>
            </button>
          ) : (
            ""
          )}
          <div className="p-6 text-center">
            {icon === "warn" ? (
              <Exclamation />
            ) : icon === "done" ? (
              <div className="mx-auto mb-4 w-14 h-14 border border-green-500 border-4 p-3 rounded-full">
                <Check color="green" size={7} />
              </div>
            ) : (
              ""
            )}
            <h3 className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-300">
              {text}
            </h3>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
