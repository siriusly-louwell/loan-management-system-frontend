import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// import Alert from "../components/modals/Alert";

export default function PageLayout({ links, path, img }) {
  return (
    <>
      <Navbar links={links} path={path} img={img} />
      {/* <Alert /> */}
      <Outlet />
      <Footer />
    </>
  );
}
