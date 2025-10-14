import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import Widget from "../assets/icons/Widget";
import Chart from "../assets/icons/Chart";
import Mailbox from "../assets/icons/Mailbox";

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
            key: "invoices",
            text: "Invoices",
            component: <Mailbox />,
            // icon: <Notif num="3" />,
          },
        ]}
      />
      <Outlet />
    </div>
  );
}
