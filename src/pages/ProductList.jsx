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

export default function ProductList() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { carouselSlide } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchUnits());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(toggleSlide({ type: "auto" }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-100 py-8 justify-items-center antialiased dark:bg-gray-800 md:py-12">
      {user?.role !== "customer" ? <StickyBanner /> : ""}
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="relative w-full space-y-4 lg:max-w-6xl mb-3 mx-auto rounded-xl overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${carouselSlide * 100}%)` }}>
            <BasicBanner
              caption="Rhean Motor Center"
              context="A trusted motorcycle loan provider that has been helping customers finance their dream motorcycles since year 2000."
            />
            <SpecialOfferBanner />
            <CreditBanner
              caption="Your Journey Starts Here — Fast, Flexible Motorcycle Loans."
              context="We make it simple to finance your next motorcycle with plans that fit your lifestyle and budget."
            />
          </div>

          <button
            onClick={() => {
              dispatch(toggleSlide({ type: "prev" }));
            }}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 opacity-60 text-white p-2 rounded-full">
            <span className="text-2xl">
              <svg
                className="shrink-0 size-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </span>
          </button>
          <button
            onClick={() => {
              dispatch(toggleSlide({ type: "next" }));
            }}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 opacity-60 text-white p-2 rounded-full">
            <span className="text-2xl">
              <svg
                className="shrink-0 size-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </span>
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <button
              className={`w-2 h-2 rounded-full ${
                carouselSlide === 0 ? "bg-rose-500" : "bg-gray-300"
              }`}
              onClick={() => dispatch(toggleSlide({ value: 0 }))}
            />
            <button
              className={`w-2 h-2 rounded-full ${
                carouselSlide === 1 ? "bg-rose-500" : "bg-gray-300"
              }`}
              onClick={() => dispatch(toggleSlide({ value: 1 }))}
            />
            <button
              className={`w-2 h-2 rounded-full ${
                carouselSlide === 2 ? "bg-rose-500" : "bg-gray-300"
              }`}
              onClick={() => dispatch(toggleSlide({ value: 2 }))}
            />
          </div>
        </div>
        <UnderlineTabs />
        <Outlet />
      </div>
      {/* <FilterPanel /> */}
    </section>
  );
}
