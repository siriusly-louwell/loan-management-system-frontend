import React from "react";
import Navlink from "../links/NavLink";

export default function ApplicantNav() {
  return (
    <>
      <Navlink pathName="Home" to="app" />
      <Navlink pathName="My Loans" to="myloans" />
      <Navlink pathName="Payment History" to={`history/user-details/${localStorage.getItem("user_id")}`} />
      <Navlink pathName="Billing Statement" to="billing" />
    </>
  );
}
