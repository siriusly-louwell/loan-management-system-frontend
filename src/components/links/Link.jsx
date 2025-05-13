import React from "react";

export default function Link({text, style, onclick}) {
    const className = "font-medium text-blue-500 hover:underline dark:text-primary-500 " + style;

    return (
        <a href="" onClick={onclick} class={className}>{text}</a>
    );
}