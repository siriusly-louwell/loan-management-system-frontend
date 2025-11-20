import React from "react";

export default function CreditBanner({ caption, context }) {
  return (
    <div className="w-full md:min-w-full grid md:grid-cols-2 gap-x-8 gap-y-12 min-h-72 px-8 md:px-16 py-12 bg-gradient-to-br from-rose-600 via-rose-500 to-rose-400 rounded-lg overflow-hidden">
      <div className="md:max-w-md flex flex-col justify-center">
        <h1 className="text-2xl font-semibold text-white">{caption}</h1>
        <p className="text-base text-gray-200 leading-relaxed mt-4">
          {context}
        </p>
        <button
          type="button"
          className="bg-rose-200 hover:bg-rose-300 text-rose-800 font-medium py-3 px-6 rounded-lg text-sm cursor-pointer w-max mt-6">
          Get Started
        </button>
      </div>
      <div className="relative h-full">
        <img
          src="https://readymadeui.com/images/payment-img.webp"
          alt="Banner Image"
          className="w-full aspect-[6/4] md:right-0 md:top-0 max-lg:bottom-0 m-auto md:absolute object-contain object-center rounded-lg"
        />
      </div>
    </div>
  );
}
