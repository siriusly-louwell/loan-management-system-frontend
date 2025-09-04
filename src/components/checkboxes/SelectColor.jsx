import React from "react";
import ColorLabel from "../ColorLabel";

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
  const spectrum = bool
    ? arr
    : colorType !== "ofc"
    ? [
        "#ffb6b9",
        "#ff6b6b",
        "pink",
        "rose",
        "red",
        "#c41e3a",
        "#d99058",
        "orange",
        "#ff7f50",
        "amber",
        "yellow",
        "#daa520",
        "#f4c430",
        "#9caf88",
        "#98ff98",
        "#50c878",
        "green",
        "lime",
        "#228b22",
        "emerald",
        "#2ec4b6",
        "teal",
        "cyan",
        "sky",
        "#4169e1",
        "blue",
        "#0077b6",
        "#3f72af",
        "indigo",
        "#6a0dad",
        "#702963",
        "#66023c",
        "violet",
        "purple",
        "fuchsia",
        "#cdb4db",
        "#d68a59",
        "#d2691e",
        "#967117",
        "#954535",
        "#964b00",
        "#80461b",
        "#7b3f00",
        "#800000",
        "#65000b",
        "white",
        "#fffff0",
        "#fff5ee",
        "#fdf5e6",
        "#faf0e6",
        "#b2beb5",
        "#8c92ac",
        "#848482",
        "#938b78",
        "#98817b",
        "#9f8170",
        "#738276",
        "#676767",
        "#4f666a",
        "neutral",
        "zinc",
        "stone",
        "slate",
        "gray",
        "#555555",
        "#4d5d53",
        "#635147",
        "#36454f",
        "#3A4D39",
        "#264653",
        "#483c32",
        "#2a3439",
        "#3D0C4A",
        "#2B2B2B",
        "#2C2D34",
        "#232B2B",
        "#1B1F3B",
        "#1C1C1C",
        "#0a1128",
        "#0F0F1C",
        "black",
      ]
    : [
        "#fefefe",
        "#f8f9fa",
        "#e5e4e2",
        "#c0c0c0",
        "#f60c00",
        "#d70000",
        "#b00020",
        "#990000",
        "#d2042d",
        "#ff4500",
        "#cba135",
        "#ffe600",
        "#ffd700",
        "#ccff00",
        "#a6e22e",
        "#4db849",
        "#556b2f",
        "#0033a0",
        "#007cf0",
        "#008080",
        "#777b7e",
        "#800020",
        "#00205b",
        "#2e003e",
        "#2a2a2a",
        "#1c1c1c",
        "#000000",
      ];
  // const spectrum1 = bool ? arr : [
  //     '#ffb6b9', '#ff6b6b', 'pink', 'rose', 'red', '#c41e3a', '#d99058', 'orange', '#ff7f50', 'amber', 'yellow', '#daa520',
  //     '#f4c430', '#9caf88', '#98ff98', '#50c878', 'green', 'lime', '#228b22', 'emerald', '#2ec4b6', 'teal', 'cyan',
  //     'sky', '#4169e1', 'blue', '#0077b6', '#3f72af', 'indigo', '#6a0dad', '#702963', '#66023c', 'violet', 'purple', 'fuchsia',
  //     '#cdb4db', '#d68a59', '#d2691e', '#967117', '#954535', '#964b00', '#80461b', '#7b3f00', '#800000', '#65000b', 'white', '#fffff0',
  //     '#fff5ee', '#fdf5e6', '#faf0e6', '#b2beb5', '#8c92ac', '#848482', '#938b78', '#98817b', '#9f8170', '#738276', '#676767', '#4f666a',
  //     'neutral', 'zinc', 'stone', 'slate', 'gray', '#555555', '#4d5d53', '#635147', '#36454f', '#3A4D39', '#264653', '#483c32',
  //     '#2a3439', '#3D0C4A', '#2B2B2B', '#2C2D34', '#232B2B', '#1B1F3B', '#1C1C1C', '#0a1128', '#0F0F1C', 'black'
  // ];
  // const spectrum2 = bool ? arr : [
  //     '#fefefe', '#f8f9fa', '#e5e4e2', '#c0c0c0', '#ff7f50', '#f60c00', '#d70000', '#b00020', '#990000', '#d2042d', '#ff4500', '#cba135',
  //     '#ffe600', '#f4c430', '#ffd700', '#ccff00', '#a6e22e', '#4db849', '#228b22', '#556b2f', '#0033a0', '#007cf0', 'sky', '#3f72af',
  //     '#008080', '#777b7e', '#800020', '#00205b', '#2e003e', '#2a2a2a', '#1c1c1c', '#000000'
  // ];
  return (
    <div className="sm:flex space-x-2 my-5">
      <p className="text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">
        {text}
      </p>
      <div className="grid grid-cols-10 lg:grid-cols-9 gap-x-7 mt-4 sm:mt-0 sm:gap-y-3 sm:gap-x-10">
        {spectrum.map((color) => {
          const newColor = bool ? color.color : color;
          const including = bool
            ? colors[index] === newColor
            : colors.includes(`${newColor}`);

          return (
            <>
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
                check={including}
                onChange={(e) => {
                  if (index > 0 || index === 0)
                    changeColor(index, e.target.value);
                  else {
                    changeColor(e.target.value);
                  }
                }}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
