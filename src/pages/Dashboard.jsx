import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import Widget from "../assets/icons/Widget";
import Notif from "../assets/icons/Notif";
import Chart from "../assets/icons/Chart";
import Mailbox from "../assets/icons/Mailbox";
import Users from "../assets/icons/Users";
import Basket from "../assets/icons/Basket";

export default function Dashboard() {
  return (
    <div className="sm:flex bg-gray-100 dark:bg-gray-800">
      <SideBar
        sideLinks={[
          {
            key: "overview",
            text: "Overview",
            component: <Widget />,
            icon: "",
          },
          {
            key: "analytics",
            text: "Analytics",
            component: <Chart />,
            icon: "",
          },
          {
            key: "notifications",
            text: "Notifications",
            component: <Mailbox />,
            icon: <Notif num="3" />,
          },
          { key: "invoices", text: "Invoices", component: <Users />, icon: "" },
          {
            key: "products",
            text: "Products",
            component: <Basket />,
            icon: "",
          },
        ]}
      />
      <Outlet />
    </div>
  );
}
