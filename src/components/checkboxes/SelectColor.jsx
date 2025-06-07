import React from "react";
import ColorLabel from "../ColorLabel";

export default function SelectColor({text, size, colors, changeColor, arr = []}) {
    const bool = arr.length > 0;
    const spectrum = bool ? arr : [
        '#ffb6b9', '#ff6b6b', 'pink', 'rose', 'red', '#c41e3a', '#d99058', 'orange', '#ff7f50', 'amber', 'yellow', '#daa520',
        '#f4c430', '#9caf88', '#98ff98', '#50c878', 'green', 'lime', '#228b22', 'emerald', '#2ec4b6', 'teal', 'cyan',
        'sky', '#4169e1', 'blue', '#0077b6', '#3f72af', 'indigo', '#6a0dad', '#702963', '#66023c', 'violet', 'purple', 'fuchsia',
        '#cdb4db', '#d68a59', '#d2691e', '#967117', '#954535', '#964b00', '#80461b', '#7b3f00', '#800000', '#65000b', 'white', '#fffff0',
        '#fff5ee', '#fdf5e6', '#faf0e6', '#b2beb5', '#8c92ac', '#848482', '#938b78', '#98817b', '#9f8170', '#738276', '#676767', '#4f666a',
        'neutral', 'zinc', 'stone', 'slate', 'gray', '#555555', '#4d5d53', '#635147', '#36454f', '#3A4D39', '#264653', '#483c32',
        '#2a3439', '#3D0C4A', '#2B2B2B', '#2C2D34', '#232B2B', '#1B1F3B', '#1C1C1C', '#0a1128', '#0F0F1C', 'black'
    ];
    return (
        <div className="sm:flex space-x-2 my-5">
            <p className="text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">{text}</p>
            <div className='grid grid-cols-10 lg:grid-cols-9 gap-x-7 mt-4 sm:mt-0 sm:gap-y-3 sm:gap-x-10'>
                {spectrum.map(color => {
                    const newColor = bool ? color.color : color;
                    const including = bool ? colors == newColor : colors.includes(`${newColor}`);

                    return (<>
                        <label htmlFor={newColor}>
                            <ColorLabel style={newColor} size={size} selected={including ? "border-blue-500 border-2" : ""} />
                        </label>
                        <input type="checkbox" value={newColor} id={newColor} className="hidden" check={including} onChange={(e) => changeColor(e.target.value)} />
                    </>)
                })}
            </div>
        </div>
    );
}