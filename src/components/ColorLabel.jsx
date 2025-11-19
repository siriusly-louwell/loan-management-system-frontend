import React from "react";
import Check from "../assets/icons/Check";

export default function ColorLabel({ style, size = 4, selected = "" }) {
  let colStyle;
  if (!style) {
    return;
  }
  if (
    style.includes("#") &&
    style !== "#fefefe" &&
    style !== "#f8f9fa" &&
    style !== "#e5e4e2" &&
    style !== "#faf0e6" &&
    style !== "#fffff0" &&
    style !== "#fff5ee" &&
    style !== "#fdf5e6"
  ) {
    colStyle = `bg-[${style}]`;
  } else {
    switch (style) {
      case "black":
        colStyle = "bg-black";
        break;
      case "white":
        colStyle = "bg-white border border-gray-500";
        break;
      case "#fffff0":
      case "#fefefe":
      case "#f8f9fa":
      case "#e5e4e2":
      case "#faf0e6":
      case "#fff5ee":
      case "#fdf5e6":
        colStyle = `bg-[${style}] border border-gray-500`;
        break;
      default:
        colStyle = `bg-${style}-500`;
    }
  }

  return (
    <div
      className={`h-${size} w-${size} ${colStyle} ${selected} rounded-full inline-block mr-1 hover:opacity-70 flex justify-center items-center px-1`}
    >
      {selected !== "" ? <Check /> : ""}
    </div>
  );
}
