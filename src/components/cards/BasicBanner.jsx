import React from "react";
import RMCI from "../../assets/images/RMCI.png";

export default function BasicBanner({ caption, context }) {
  return (
    <div className="min-w-full grid rounded-xl md:grid-cols-2 min-h-48 px-8 md:px-12 bg-gradient-to-r from-red-600 via-red-400 to-red-200 rounded-sm overflow-hidden">
      <div className="md:col-span-1 max-w-xl flex flex-col justify-center py-4">
        <h1 className="text-4xl font-medium text-white">{caption}</h1>
        <p className="text-base text-gray-200 leading-relaxed mt-4">
          {context}
        </p>
      </div>
      <div className="relative h-[115%] aspect-[5/3] max-md:hidden">
        <img
          src={RMCI}
          alt="rhean motor logo"
          className="absolute -top-8 right-0 w-full h-[130%] opacity-30 object-contain pointer-events-none select-none"
        />
      </div>
    </div>
  );
}
