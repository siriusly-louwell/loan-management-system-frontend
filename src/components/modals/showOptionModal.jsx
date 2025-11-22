import React from "react";


/*
  Each button has a onSelect() function which takes in a string parameter
  to be used in handleSelectOption at Inventory.jsx, identifying which
  filter is used
*/
export default function ShowOptionModal({ open, onClose, onSelect }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[300px]">

        <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
          Print Options
        </h2>

        <div className="flex flex-col space-y-3">
          <button className="p-2 bg-rose-600 text-white rounded" onClick={() => onSelect("daily")}>
            Daily
          </button>

          <button className="p-2 bg-rose-600 text-white rounded" onClick={() => onSelect("weekly")}>
            Weekly
          </button>

          <button className="p-2 bg-rose-600 text-white rounded" onClick={() => onSelect("monthly")}>
            Monthly
          </button>

          <button className="p-2 bg-rose-600 text-white rounded" onClick={() => onSelect("yearly")}>
            Yearly
          </button>
        </div>

        {/* Close Button */}
        <button
          className="mt-4 w-full p-2 bg-gray-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>

      </div>
    </div>
  );
}
