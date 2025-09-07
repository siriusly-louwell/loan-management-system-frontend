import React from "react";
import ColorLabel from "../ColorLabel";
import { OFC_COLORS, ALL_COLORS } from "../../constants/colors";

export default function SelectColor({
  text,
  size,
  colors,
  changeColor,
  index,
  arr = [],
  colorType = "all",
}) {
  const bool = arr.length > 0;
  const spectrum = bool ? arr : colorType !== "ofc" ? ALL_COLORS : OFC_COLORS;

  return (
    <div className="sm:flex space-x-2 my-5">
      <p className="text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">
        {text}
      </p>
      <div className="grid grid-cols-10 lg:grid-cols-9 gap-x-7 mt-4 sm:mt-0 sm:gap-y-3 sm:gap-x-10">
        {spectrum.map((color, i) => {
          const newColor = bool ? color.color : color;
          const including = bool
            ? colors === newColor
            : colors.includes(`${newColor}`);

          return (
            <div key={i}>
              <label htmlFor={`${newColor}_${index}`}>
                <ColorLabel
                  style={newColor}
                  size={size}
                  selected={including ? "border-blue-500 border-2" : ""}
                />
              </label>
              <input
                type="checkbox"
                value={newColor}
                id={`${newColor}_${index}`}
                className="hidden"
                check={including ? "true" : ""}
                onChange={(e) => {
                  changeColor(e.target.value);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
