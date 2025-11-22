import React from "react";

export default function ExportButtons({ onPrint, onCsv }) {
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        className="inline-flex items-center justify-center text-white bg-rose-600 hover:bg-rose-600 focus:ring-4 focus:ring-rose-600 font-medium rounded-lg text-sm px-4 py-2"
        onClick={onPrint}
      >
        Print
      </button>
      <button
        type="button"
        className="inline-flex items-center justify-center text-white bg-rose-600 hover:bg-rose-600 focus:ring-4 focus:ring-rose-600 font-medium rounded-lg text-sm px-4 py-2"
        onClick={onCsv}
      >
        Export CSV
      </button>
    </div>
  );
}
