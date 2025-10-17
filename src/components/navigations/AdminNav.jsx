import React from "react";
import Navlink from "../links/NavLink";

export default function AdminNav() {
  return (
    <>
      <Navlink pathName="Dashboard" to="app" />
      <Navlink pathName="Inventory" to="inventory" />
      <Navlink pathName="Accounts" to="accounts" />
      <Navlink pathName="Loans" to="loans" />
    </>
  );
}
