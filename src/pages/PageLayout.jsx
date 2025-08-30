import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function PageLayout({ links, path, img }) {
  return (
    <>
      <Navbar links={links} path={path} img={img} />
      <Outlet />
      <Footer />
    </>
  );
}
