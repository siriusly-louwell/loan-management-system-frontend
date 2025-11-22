import React from "react";
import Navlink from "../links/NavLink";
import { useSelector } from "react-redux";
import { UserEntity } from "../../services/entities/User";

export default function ApplicantNav() {
  const { id } = useSelector(UserEntity);
  
  return (
    <>
      <Navlink pathName="Home" to="app" />
      <Navlink pathName="My Loans" to="myloans" />
      <Navlink pathName="Payment History" to={`history/user-details/${id}`} />
      <Navlink pathName="Billing Statement" to="billing" />
    </>
  );
}
