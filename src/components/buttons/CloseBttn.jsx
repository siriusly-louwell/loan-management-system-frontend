import React from "react";
import Ex from "../../assets/icons/Ex";

export default function CloseBttn({ id, cancel, trigger }) {
//   function click() {
//     if (cancel) trigger(cancel);
//     document.getElementById(id).style.display = "none";
//   }
  return (
    <button
      type="button"
      onClick={trigger}
      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
      <Ex className="w-5 h-5" />
      <span className="sr-only">Close modal</span>
    </button>
  );
}
