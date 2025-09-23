import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import Users from "../assets/icons/Users";

export default function Inventory() {
  return (
    <div className="sm:flex bg-white dark:bg-gray-800">
      <SideBar
        sideLinks={[
          {
            key: "applicants",
            text: "Applicants",
            component: <Users />,
            icon: "",
          },
          {
            key: "customers",
            text: "Customers",
            component: <Users />,
            icon: "",
          },
          {
            key: "cis",
            text: "Credit Investigators",
            component: <Users />,
            icon: "",
          },
          { key: "staffs", text: "Staffs", component: <Users />, icon: "" },
        ]}
      />
      <Outlet />
    </div>
  );
}
