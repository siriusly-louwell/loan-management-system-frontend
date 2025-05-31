import React from "react";

export default function CustomBttn({text, classname, children, onclick}) {
    return (
        <button type="button" className={classname} onClick={onclick}>
            {children}
            {text}
        </button>
    );
}