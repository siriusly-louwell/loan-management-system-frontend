import React from "react";

export default function FormTH({label, style, children}) {
    const className= "mb-2 border-x dark:border-gray-500 " + style;
    
    return (
        <th scope="col" class={className}>
            {label}
            {children}
        </th>
    );
}