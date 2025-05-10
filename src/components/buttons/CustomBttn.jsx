import React from "react";

export default function CustomBttn({text, className, children, onclick}) {
    return (
        <button type="button" class={className} onClick={onclick}>
            {children}
            {text}
        </button>
    );
}