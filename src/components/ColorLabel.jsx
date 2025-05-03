import React from "react";

export default function ColorLabel({color, style}) {
    const className = "h-4 w-4 rounded-full inline-block mr-2 bg-"+style+"-700";

    return (
        <div class="flex items-center">
            <div class={className}></div>
            {color}
        </div>
    );
}