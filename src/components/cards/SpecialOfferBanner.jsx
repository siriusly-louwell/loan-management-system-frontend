import React from "react";
import honda from "../../assets/images/honda.jpg";

export default function SpecialOfferBanner() {
  return (
    <div className="w-full md:min-w-full bg-white grid sm:grid-cols-2 items-center max-sm:gap-10 py-10 border-y-8 border-rose-400">
      <div className="text-center px-6">
        <h3 className="font-extrabold text-5xl text-rose-500 leading-tight">
          <span className="text-slate-900">Special</span> Offer
        </h3>
        <h6 className="text-2xl text-slate-900 mt-2">Limited Time Deal</h6>
        <p className="text-slate-900 text-base leading-relaxed mt-4">
          Discover amazing discounts and deals. Don't miss out on our exclusive
          offers for a limited time.
        </p>
        <button
          type="button"
          className="bg-gradient-to-r hover:bg-gradient-to-l from-rose-400 to-rose-600 hover:bg-rose-500 text-white tracking-wide font-medium text-[15px] py-3 px-6 rounded-lg w-max cursor-pointer mt-12">
          Get Started
        </button>
      </div>
      <div className="bg-gradient-to-tr from-rose-400 to-rose-600 rounded-tl-full rounded-bl-full w-full h-max">
        <div className="p-2">
          <img
            src={honda}
            className="h-64 w-64 rounded-full object-cover border-4 border-white"
            alt="special offer"
          />
        </div>
      </div>
    </div>
  );
}
