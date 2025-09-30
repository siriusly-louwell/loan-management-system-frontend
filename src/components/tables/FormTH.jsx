import React from "react";

export default function FormTH({ label, style, children }) {
  const className = "px-4 py-2 text-left " + style;

  return (
    <th scope="col" className={className}>
      {label}
      {children}
    </th>
  );
}
