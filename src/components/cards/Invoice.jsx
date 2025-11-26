import React, { useEffect, useState } from "react";
import RMCI from "../../assets/images/RMCI.png";
import { useDispatch, useSelector } from "react-redux";
import { LoanEntity } from "../../services/entities/Loan";
import { ApplicationEntity } from "../../services/entities/Application";
import ColorLabel from "../ColorLabel";
import { PaymentEntity } from "../../services/entities/Payment";
import { toggleModal } from "../../services/redux/slices/uiSlice";
import { FileDown } from "lucide-react";

const calculateTotalPayment = (amount_paid, rebate) => {
  return amount_paid - rebate;
};

const Invoice = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { transactions, getAmortization, getAmortizationInt } =
    useSelector(LoanEntity);
  const payment = useSelector(PaymentEntity);
  const { paymentLoading } = useSelector((state) => state.payment);
  const { email, fullName, address, contactNumber } =
    useSelector(ApplicationEntity);
  const { loanLoading } = useSelector((state) => state.application);
  const { modals } = useSelector((state) => state.ui);
  const formattedDate = new Date(payment.created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section ref={ref} className="p-4 bg-white dark:bg-gray-800/90 rounded-lg">
      <div className="mb-5 pb-5 flex justify-between items-center border-b border-rose-500 dark:border-rose-500">
        <div>
          <h2 className="print-title text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Invoice Receipt
          </h2>
          <img src={RMCI} className="h-8 rmci hidden" alt="Rhean Motor Logo" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <div className="grid space-y-3">
            <dl className="flex flex-col sm:flex-row gap-x-3 text-md">
              <dt className="min-w-36 max-w-50 text-gray-500">Reference No.</dt>
              <dd className="text-gray-800 dark:text-gray-200">
                {loanLoading ? (
                  <div className="w-40 h-4 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
                ) : (
                  <span className="inline-flex items-center cursor-pointer gap-x-1.5 text-rose-600 dark:text-rose-500 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium">
                    {payment?.cert_num}
                  </span>
                )}
              </dd>
            </dl>
            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">Date Issued</dt>
              <dd className="text-gray-800 dark:text-gray-200">
                {loanLoading ? (
                  <div className="w-40 h-4 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
                ) : (
                  <span className="inline-flex items-center cursor-pointer gap-x-1.5 text-rose-600 dark:text-rose-500 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium">
                    {formattedDate}
                  </span>
                )}
              </dd>
            </dl>{" "}
            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">Cashier</dt>
              <dd className="text-gray-800 dark:text-gray-200">
                {loanLoading ? (
                  <div className="w-40 h-4 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
                ) : (
                  <span className="inline-flex items-center cursor-pointer gap-x-1.5 text-rose-600 dark:text-rose-500 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium">
                    Rhean Motor
                  </span>
                )}
              </dd>
            </dl>
            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">Status</dt>
              <dd className="text-gray-800 dark:text-gray-200">
                {loanLoading ? (
                  <div className="w-40 h-4 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
                ) : (
                  <span className="inline-flex items-center cursor-pointer gap-x-1.5 text-rose-600 dark:text-rose-500 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium">
                    {payment?.balance ? "Down Payment" : "Full Payment"}
                  </span>
                )}
              </dd>
            </dl>
          </div>
        </div>

        <div></div>
        <div className="grid space-y-3">
          <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
            <dt className="min-w-36 max-w-50 text-gray-500">Customer Name:</dt>
            <dd className="font-medium text-gray-800 dark:text-gray-200">
              {fullName}
            </dd>
          </dl>
          <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
            <dt className="min-w-36 max-w-50 text-gray-500">Contact Number:</dt>
            <dd className="font-medium text-gray-800 dark:text-gray-200">
              {contactNumber}
            </dd>
          </dl>
          <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
            <dt className="min-w-36 max-w-50 text-gray-500">Address:</dt>
            {loanLoading ? (
              <div className="w-20 h-4 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
            ) : (
              <dd className="font-medium text-gray-800 dark:text-gray-200">
                {"Purok" + address.personal_pres}
              </dd>
            )}
          </dl>
          <dl className="flex flex-col sm:flex-row gap-x-3 text-md">
            <dt className="min-w-36 max-w-50 text-gray-500">Brand/Model</dt>
            {!transactions[0]?.motorcycle ? (
              <div className="w-20 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
            ) : (
              <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                {transactions[0]?.motorcycle?.brand +
                  " " +
                  transactions[0]?.motorcycle.name}
              </dd>
            )}
          </dl>
        </div>
      </div>
      <div className="mt-8">
        <div className="gap-3 grid-cols-1 w-full border">
          <div className="border border-gray-800 rounded overflow-hidden ">
            {/* Header Row */}
            <dl className="grid sm:grid-cols-5 gap-0 text-lg font-bold bg-gray-100 border-b border-gray-800 w-full">
              <dt className="col-span-2 text-gray-800 p-2 border-r border-gray-800">
                Description
              </dt>
              <dd className="col-span-2 text-gray-800 p-2">Amount</dd>
            </dl>

            {/* Monthly Payment */}
            <dl className="grid sm:grid-cols-5 gap-0 text-md border-b border-gray-800 w-full">
              <dt className="col-span-2 text-gray-800 p-2 border-r border-gray-800 dark:text-gray-200">
                Monthly Payment:
              </dt>

              <dd className="col-span-2 font-medium text-gray-800 p-2 dark:text-gray-200">
                {paymentLoading ? (
                  <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
                ) : (
                  `₱${parseFloat(payment?.amount_paid)?.toFixed(2)}`
                )}
              </dd>
            </dl>

            {/* Penalty */}
            <dl className="grid sm:grid-cols-5 gap-0 text-md border-b border-gray-800 w-full">
              <dt className="col-span-2 text-gray-800 p-2 border-r border-gray-800 dark:text-gray-200">
                Penalty:
              </dt>
              <dd className="col-span-2 font-medium text-gray-800 p-2 dark:text-gray-200">
                {paymentLoading ? (
                  <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
                ) : (
                  "₱0.00"
                )}
              </dd>
            </dl>

            {/* Other Charges */}
            <dl className="grid sm:grid-cols-5 gap-0 text-md border-b border-gray-800 w-full">
              <dt className="col-span-2 text-gray-800 p-2 border-r border-gray-800 dark:text-gray-200">
                Other Charges:
              </dt>
              <dd className="col-span-2 font-medium text-gray-800 p-2 dark:text-gray-200">
                {paymentLoading ? (
                  <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
                ) : (
                  "₱0.00"
                )}
              </dd>
            </dl>

            {/* Rebate */}
            <dl className="grid sm:grid-cols-5 gap-0 text-md border-b border-gray-800 w-full">
              <dt className="col-span-2 text-gray-800 p-2 border-r border-gray-800 dark:text-gray-200">
                Rebate:
              </dt>
              <dd className="col-span-2 font-medium text-gray-800 p-2 dark:text-gray-200">
                {paymentLoading ? (
                  <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
                ) : (
                  `₱${parseFloat(transactions[0]?.motorcycle.rebate).toLocaleString()}`
                )}
              </dd>
            </dl>

            {/* Total Amount Paid */}
            <dl className="grid sm:grid-cols-5 gap-0 text-lg font-bold w-full">
              <dt className="col-span-2 text-gray-800 p-2 border-r border-gray-900 dark:text-gray-200">
                Total Amount Paid:
              </dt>
              <dd className="col-span-2 text-gray-800 p-2 border-gray-900 dark:text-gray-200">
                {paymentLoading ? (
                  <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
                ) : (
                  `₱${parseFloat(
                    calculateTotalPayment(
                      payment.amount_paid,
                      transactions[0]?.motorcycle.rebate
                    )
                  ).toLocaleString()}`
                )}
              </dd>
            </dl>

          </div>
        </div>
      </div>

      <div className="mt-8 flex sm:justify-end">
        <div className="w-full max-w-2xl sm:text-end space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2"></div>
          <button
            onClick={() =>
              dispatch(toggleModal({ name: "receipt", value: modals.receipt }))
            }
            className="inline-flex items-center gap-2 py-3 text-sm text-gray-600 hover:text-rose-600 focus:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200 dark:text-gray-400 dark:hover:text-rose-500 dark:focus:text-white dark:hover:bg-gray-800"
          >
            <FileDown size={16} />
            <span className="truncate max-w-[200px]">Receipt</span>
          </button>
        </div>
      </div>
    </section>
  );
});

Invoice.displayName = "Invoice";

export default Invoice;
