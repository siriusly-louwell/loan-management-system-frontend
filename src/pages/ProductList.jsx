import React from "react";
import { useEffect, useRef, useState } from "react";
import FilterPanel from "../components/FilterPanel";
import CreditBanner from "../components/cards/CreditBanner";
import BasicBanner from "../components/cards/BasicBanner";
import SpecialOfferBanner from "../components/cards/SpecialOfferBanner";
import StickyBanner from "../components/cards/StickyBanner";
import { Outlet, useLocation } from "react-router-dom";
import UnderlineTabs from "../components/tabs/UnderlineTabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnits, mapEntities } from "../services/redux/slices/unitSlice";
import { setAlert } from "../services/redux/slices/uiSlice";
import { Unit } from "../services/entities/Unit";
import { mapUnitUseCase } from "../services/usecases/unit/mapUnitUseCase";

export default function ProductList({ url }) {
  const { units, loading } = useSelector((state) => state.unit);
  const dispatch = useDispatch();
  const [isSort, setSort] = useState(false);
  const [isFilt, setFilt] = useState(false);
  const [motors, setMotor] = useState([]);
  const [motorLoad, setMotorLoad] = useState(true);
  const sortRef = useRef(null);
  const filtRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const location = useLocation();

  const toggleSort = () => setSort((prev) => !prev);
  const toggleFilt = () => setFilt((prev) => !prev);

  useEffect(() => {
    const menuClicked = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSort(false);
      }
    };

    document.addEventListener("mousedown", menuClicked);
    return () => document.removeEventListener("mousedown", menuClicked);
  }, []);

  useEffect(() => {
    const filtClicked = (event) => {
      if (filtRef.current && !filtRef.current.contains(event.target)) {
        setFilt(false);
      }
    };

    document.addEventListener("mousedown", filtClicked);
    return () => document.removeEventListener("mousedown", filtClicked);
  }, []);

  useEffect(() => {
    dispatch(fetchUnits());
    // try {
    // } catch (error) {
    //   dispatch(
    //     setAlert({
    //       message: "Failed to fetch all units",
    //       type: "error",
    //     })
    //   );
    // }
    // fetch("http://localhost:8000/api/motorcycle")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setMotor(data);
    //     setMotorLoad(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data: ", error);
    //     setMotorLoad(true);
    //   });
  }, []);

  useEffect(() => {
    if(units) {
      const motorArr = mapUnitUseCase(units);
      // const motorArr = units.map((unit) => new Unit(unit));  
      setMotor(motorArr);
    }
  }, [loading, units]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 3);
    }, 5000); // 5000ms = 5 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + 3) % 3);
  };

  const context = {
    toggleSort,
    toggleFilt,
    sortRef,
    filtRef,
    isSort,
    isFilt,
    motorLoad,
    motors,
    url,
  };

  return (
    <section className="bg-gray-100 py-8 justify-items-center antialiased dark:bg-gray-800 md:py-12">
      {location.pathname !== "/customer" ? <StickyBanner /> : ""}
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="relative w-full space-y-4 lg:max-w-6xl mb-3 mx-auto rounded-xl overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}>
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
            onClick={prevSlide}
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
            onClick={nextSlide}
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
                current === 0 ? "bg-rose-500" : "bg-gray-300"
              }`}
              onClick={() => setCurrent(0)}
            />
            <button
              className={`w-2 h-2 rounded-full ${
                current === 1 ? "bg-rose-500" : "bg-gray-300"
              }`}
              onClick={() => setCurrent(1)}
            />
            <button
              className={`w-2 h-2 rounded-full ${
                current === 2 ? "bg-rose-500" : "bg-gray-300"
              }`}
              onClick={() => setCurrent(2)}
            />
          </div>
        </div>
        <UnderlineTabs />
        <Outlet context={context} />
      </div>
      {/* <FilterPanel /> */}
    </section>
  );
}
