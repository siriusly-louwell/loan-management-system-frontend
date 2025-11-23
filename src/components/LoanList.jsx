import React from "react";
import ColorLabel from "./ColorLabel";
import ImageSkeleton from "./loading components/ImageSkeleton";
import SmallSpin from "./loading components/SmallSpin";

export default function LoanList({ data, load }) {
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center gap-6">
        {load ? (
          <div className="h-60 w-60 object-contain flex-shrink-0">
            <ImageSkeleton size={8} />
          </div>
        ) : (
          <img
            className="h-60 w-60 object-contain rounded-lg flex-shrink-0"
            src={data.img}
            alt="unit"
          />
        )}

        <div className="flex items-center space-x-1">
          {load ? (
            <div className="w-20 h-5 rounded-lg bg-gray-200 dark:bg-gray-600 animate-pulse"></div>
          ) : (
            <>
              <ColorLabel style={data.color} />
              <span className="min-w-0 font-medium text-gray-900 cursor-pointer hover:underline dark:text-white">
                {data.motorcycle.name}
              </span>
            </>
          )}
        </div>
      </div>

      <section className="grid grid-cols-3 gap-y-2">
        <p className="text-sm font-normal flex space-x-2 text-gray-500 dark:text-gray-400">
          <span className="font-medium mr-2 text-gray-900 dark:text-white">
            Quantity:
          </span>
          {load ? <SmallSpin size={20} /> : data.quantity}
        </p>
        <p className="text-sm font-normal flex space-x-2 text-gray-500 dark:text-gray-400">
          <span className="font-medium mr-2 text-gray-900 dark:text-white">
            Tenure:
          </span>
          {load ? <SmallSpin size={20} /> : `${data.tenure} year/s`}
        </p>
        <p className="text-sm font-normal flex space-x-2 text-gray-500 dark:text-gray-400">
          <span className="font-medium mr-2 text-gray-900 dark:text-white">
            Rebate value:
          </span>
          {load ? (
            <SmallSpin size={20} />
          ) : (
            `₱${parseFloat(data.motorcycle.rebate).toLocaleString()}`
          )}
        </p>
        <p className="text-sm font-normal flex space-x-2 text-gray-500 dark:text-gray-400">
          <span className="font-medium mr-2 text-gray-900 dark:text-white">
            Due date:
          </span>
          {load ? <SmallSpin size={20} /> : data.due_date}
        </p>
        <p className="text-sm font-normal flex space-x-2 text-gray-500 dark:text-gray-400">
          <span className="font-medium mr-2 text-gray-900 dark:text-white">
            Interest rate:
          </span>
          {load ? <SmallSpin size={20} /> : `${data.motorcycle.interest}%`}
        </p>
        <p className="text-sm font-normal flex space-x-2 text-gray-500 dark:text-gray-400">
          <span className="font-medium mr-2 text-gray-900 dark:text-white">
            Amortization:
          </span>
          {load ? <SmallSpin size={20} /> : data.amortization}
        </p>
      </section>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-normal flex space-x-2 text-gray-500 dark:text-gray-400">
          <span className="font-medium mr-2 text-gray-900 dark:text-white">
            Downpayment:
          </span>
          {load ? (
            <SmallSpin size={20} />
          ) : (
            `₱${parseFloat(data.downpayment).toLocaleString()}`
          )}
        </p>

        <div className="flex items-center justify-end gap-4">
          {load ? (
            <p className="w-20 h-8 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse"></p>
          ) : (
            <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
              ₱{parseFloat(data.motorcycle.price).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
