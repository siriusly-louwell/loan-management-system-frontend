import React from "react";
import Navlink from "../links/NavLink";

export default function GuestNav() {
  return (
    <>
      <Navlink pathName="Home" to="/" />
      <Navlink pathName="Find Application" to="find" />
      <Navlink pathName="About" to="about" />
    </>
  );
}
