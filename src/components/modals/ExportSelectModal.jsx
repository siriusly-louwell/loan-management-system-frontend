import React from "react";

// Generic modal to choose between Print and CSV export
export default function ExportSelectModal({ open, onClose, onPrint, onCsv }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[300px] p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
          Export Options
        </h2>
        <div className="flex flex-col space-y-3">
          <button
            className="p-2 bg-rose-600 hover:bg-rose-600 text-white rounded"
            onClick={() => {
              onPrint();
            }}
          >
            Print
          </button>
          <button
            className="p-2 bg-rose-600 hover:bg-rose-600 text-white rounded"
            onClick={() => {
              onCsv();
            }}
          >
            CSV
          </button>
        </div>
        <button
          className="mt-5 w-full p-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
