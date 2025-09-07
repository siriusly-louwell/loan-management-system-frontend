import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleQuantity } from "../../services/redux/slices/formSlice";

export default function QuantityInput({
  label,
  max,
  require,
  index,
  change,
  quantType,
}) {
  const { formData } = useSelector((state) => state.form);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     handleQuantity({
  //       index: index,
  //       num: 1,
  //       type: quantType,
  //     })
  //   );
  //   // change(index, 1, "quantity");
  // }, []);

  function handleNumber(type) {
    if (type === "increment" && formData.quantity < max) {
      dispatch(
        handleQuantity({
          index: index,
          num: formData.quantity + 1,
          type: quantType,
        })
      );
      //   change(index, formData.quantity + 1, "quantity");
    }

    if (type === "decrement" && formData.quantity > 1) {
      dispatch(
        handleQuantity({
          index: index,
          num: formData.quantity - 1,
          type: quantType,
        })
      );
      //   change(index, number - 1, "quantity");
    }
  }

  function manualQuanti(num) {
    const val = num === "" ? num : Number(num);

    dispatch(
      handleQuantity({
        index: index,
        num: val,
        type: quantType,
      })
    );
    // change(index, val, "quantity");
  }

  return (
    <div>
      <label
        htmlFor="quantity-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label} {require ? <strong className="text-rose-500">*</strong> : ""}
      </label>
      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          onClick={() => handleNumber("decrement")}
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="number"
          id="quantity-input"
          name="quantity"
          value={formData.quantity}
          onChange={(e) => manualQuanti(e.target.value)}
          placeholder={max}
          min="1"
          max={max}
          required={require}
          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          type="button"
          onClick={() => handleNumber("increment")}
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
      <p
        id="helper-text-explanation"
        className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Must not exceed <strong>{max}</strong> units
      </p>
    </div>
  );
}
