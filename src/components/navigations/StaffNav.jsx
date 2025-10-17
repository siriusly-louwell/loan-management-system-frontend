import React from "react";
import Navlink from "../links/NavLink";

export default function StaffNav() {
  return (
    <>
      <Navlink pathName="Loans" to="app" />
      <Navlink pathName="Cashier" to="cashier" />
      <Navlink pathName="Walk In" to="units" />
      <Navlink pathName="History" to="history" />
    </>
  );
}
