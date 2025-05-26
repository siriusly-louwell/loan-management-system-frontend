import React from "react";

export default function CustomBttn({text, className, children, onclick}) {
    return (
        <button type="button" className={className} onClick={onclick}>
            {children}
            {text}
        </button>
    );
}