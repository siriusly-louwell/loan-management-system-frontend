import React from "react";

export default function CustomBttn({
  text,
  classname,
  children,
  onclick,
  icon,
}) {
  return (
    <button type="button" className={classname} onClick={onclick}>
      {icon}
      {children}
      {text}
    </button>
  );
}
