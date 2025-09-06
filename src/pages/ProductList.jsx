import React from "react";
import { useEffect } from "react";
import FilterPanel from "../components/FilterPanel";
import CreditBanner from "../components/cards/CreditBanner";
import BasicBanner from "../components/cards/BasicBanner";
import SpecialOfferBanner from "../components/cards/SpecialOfferBanner";
import StickyBanner from "../components/cards/StickyBanner";
import { Outlet } from "react-router-dom";
import UnderlineTabs from "../components/tabs/UnderlineTabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnits } from "../services/redux/slices/unitSlice";
import { toggleSlide } from "../services/redux/slices/uiSlice";
import BasicCarousel from "../components/cards/BasicCarousel";

export default function ProductList() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { carouselSlide } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchUnits());
  }, []);

  return (
    <section className="bg-gray-100 py-8 justify-items-center antialiased dark:bg-gray-800 md:py-12">
      {user?.role !== "customer" ? <StickyBanner /> : ""}
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <BasicCarousel length={3} loop={true}>
          <BasicBanner
            caption="Rhean Motor Center"
            context="A trusted motorcycle loan provider that has been helping customers finance their dream motorcycles since year 2000."
          />
          <SpecialOfferBanner />
          <CreditBanner
            caption="Your Journey Starts Here — Fast, Flexible Motorcycle Loans."
            context="We make it simple to finance your next motorcycle with plans that fit your lifestyle and budget."
          />
        </BasicCarousel>
        <UnderlineTabs />
        <Outlet />
      </div>
      {/* <FilterPanel /> */}
    </section>
  );
}
