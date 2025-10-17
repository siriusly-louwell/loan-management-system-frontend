import React from "react";
import Navlink from "../links/NavLink";

export default function CINav() {
  return (
    <>
      <Navlink pathName="Applications" to="app" />
      <Navlink pathName="Evaluation" to="evaluation" />
    </>
  );
}
