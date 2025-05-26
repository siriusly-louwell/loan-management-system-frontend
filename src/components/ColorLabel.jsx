import React from "react";

export default function ColorLabel({color, style}) {
    const colStyle = style == 'black' ? "bg-black" : (style == 'white' ? "bg-white border border-gray-500" : `bg-${style}-500`);

    return (
            <div className={`h-4 w-4 rounded-full inline-block mr-1 ${colStyle}`}></div>
        // <div className="flex items-center">
        //     {color}
        // </div>
    );
}