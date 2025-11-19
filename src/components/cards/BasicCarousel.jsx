import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlide } from "../../services/redux/slices/uiSlice";

export default function BasicCarousel({ children, length, loop = false }) {
  const dispatch = useDispatch();
  const { carouselSlide } = useSelector((state) => state.ui);

  useEffect(() => {
    if (loop) {
      const interval = setInterval(() => {
        dispatch(toggleSlide({ type: "auto", limit: 3 }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <>
      <div
        className={`flex transition-transform duration-500 ease-out  ${
          !loop ? "h-full" : ""
        }`}
        style={{ transform: `translateX(-${carouselSlide * 100}%)` }}
      >
        {React.Children.map(children, (child) => (
          <div className="min-w-full h-full flex-shrink-0 flex justify-center items-center overflow-hidden max-w-5">
            {child}
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          dispatch(toggleSlide({ type: "prev", limit: length }));
        }}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 opacity-60 text-white p-2 rounded-full hover:bg-gray-600 active:bg-rose-600"
      >
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
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </span>
      </button>
      <button
        onClick={() => {
          dispatch(toggleSlide({ type: "next", limit: length }));
        }}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 opacity-60 text-white p-2 rounded-full hover:bg-gray-600 active:bg-rose-600"
      >
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
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </span>
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length }, (_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === carouselSlide ? "bg-rose-500" : "bg-gray-300"
            }`}
            onClick={() => dispatch(toggleSlide({ value: index }))}
          />
        ))}
      </div>
    </>
  );
}
