import React from "react";

export default function CustomBttn({text, className, children}) {
    return (
        <button type="button" class={className}>
            {children}
            {text}
        </button>
    );
}