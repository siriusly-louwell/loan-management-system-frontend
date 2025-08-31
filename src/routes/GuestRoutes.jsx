import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "../pages/ProductList";
import UnitsAll from "../pages/UnitsAll";
import UnitsNew from "../pages/UnitsNew";
import SearchPage from "../pages/SearchPage";
import About from "../pages/About";
import ProductInfo from "../pages/ProductInfo";
import LoanInfo from "../pages/LoanInfo";
import PageLayout from "../pages/PageLayout";
import GuestNav from "../components/navigations/GuestNav";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function GuestRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout links={<GuestNav />} />}>
        <Route path="" element={<ProductList url="/unit" />}>
          <Route index element={<UnitsAll />} />
          <Route path="new" element={<UnitsNew />} />
          <Route path="top" element={<UnitsNew />} />
          <Route path="repo" element={<UnitsNew />} />
        </Route>
        <Route path="prodlist" element={<ProductList url="/unit" />}>
          <Route index element={<UnitsAll />} />
          <Route path="new" element={<UnitsNew />} />
          <Route path="top" element={<UnitsNew />} />
          <Route path="repo" element={<UnitsNew />} />
        </Route>
        <Route path="find" element={<SearchPage />} />
        <Route path="about" element={<About />} />
        <Route path="unit" element={<ProductInfo />} />
        <Route path="application" element={<LoanInfo />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
