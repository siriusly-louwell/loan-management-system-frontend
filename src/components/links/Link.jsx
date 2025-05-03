import React from "react";

export default function Link({text, style}) {
    const className = "font-medium text-blue-500 hover:underline dark:text-primary-500 " + style;

    return (
        <a href="#" class={className}>{text}</a>
    );
}