import React from "react";

export default function CustomBadge({icon, text, color}) {
    return (
        <dd class={"me-2 mt-1.5 inline-flex items-center rounded bg-"+color+"-100 px-2.5 py-0.5 text-xs font-medium text-"+color+"-800 dark:bg-"+color+"-900 dark:text-"+color+"-300"}>
            {icon}
            {text}
        </dd>
    );
}