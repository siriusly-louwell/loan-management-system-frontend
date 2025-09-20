import React from "react";
import { Link } from "react-router-dom";
import BttnwithIcon from "../buttons/BttnwithIcon";
import Plus from "../../assets/icons/Plus";

export default function BasicTabs({ ids, state, setId, load }) {
  function unitCheck(id) {
    return id === state
      ? "bg-white rounded-lg font-bold shadow text-rose-500"
      : "";
  }

  return load ? (
    <div className="border-y border-gray-300 py-2 flex w-full h-10 text-center bg-gray-300 mb-3 animate-pulse"></div>
  ) : (
    <ul className="overflow-x-auto whitespace-nowrap border-y border-gray-300 divide-x divide-gray-400 py-2 flex w-full text-center text-gray-500 bg-gray-200 mb-3">
      {ids.map((id, i) => (
        <li key={i} className="flex-shrink-0">
          <button
            type="button"
            onClick={() => setId(id)}
            className={"flex justify-center p-4 mx-3 " + unitCheck(id)}>
            Unit {i + 1}
          </button>
        </li>
      ))}
      {/* <li>
                <a href="#page1" className="flex justify-center p-4">Pilot Training</a>
            </li>
            <li>
                <a href="#page2" className="flex justify-center bg-white rounded-lg shadow text-rose-500 p-4">Titan maintenance</a>
            </li> */}
      <li className="flex items-center px-3">
        <BttnwithIcon
          text="Add more units"
          click={() =>
            (document.getElementById("add_units").style.display = "block")
          }>
          <Plus />
        </BttnwithIcon>
      </li>
    </ul>
  );
}
