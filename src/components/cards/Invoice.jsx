import React from "react";
import RMCI from "../../assets/images/RMCI.png";
import { useDispatch, useSelector } from "react-redux";
import { LoanEntity } from "../../services/entities/Loan";
import { ApplicationEntity } from "../../services/entities/Application";
import ColorLabel from "../ColorLabel";
import { PaymentEntity } from "../../services/entities/Payment";
import { toggleModal } from "../../services/redux/slices/uiSlice";
import { FileDown } from "lucide-react";

const Invoice = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { transactions } = useSelector(LoanEntity);
  const payment = useSelector(PaymentEntity);
  const { paymentLoading } = useSelector((state) => state.payment);
  const { email, fullName, address } = useSelector(ApplicationEntity);
  const { loanLoading } = useSelector((state) => state.application);
  const { modals } = useSelector((state) => state.ui);

  return (
    <section ref={ref} className="p-4 bg-white dark:bg-gray-800/90 rounded-lg">
      <div className="mb-5 pb-5 flex justify-between items-center border-b border-rose-500 dark:border-rose-500">
        <div>
          <h2 className="print-title text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Invoice
          </h2>
          <img src={RMCI} className="h-8 rmci hidden" alt="Rhean Motor Logo" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <div className="grid space-y-3">
            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">Billed to:</dt>
              <dd className="text-gray-800 dark:text-gray-200">
                {loanLoading ? (
                  <div className="w-40 h-4 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
                ) : (
                  <span className="inline-flex items-center cursor-pointer gap-x-1.5 text-rose-600 dark:text-rose-500 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium">
                    {email}
                  </span>
                )}
              </dd>
            </dl>

            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">
                Billing details:
              </dt>
              <dd className="font-medium text-gray-800 dark:text-gray-200">
                {loanLoading ? (
                  <>
                    <div className="w-40 h-4 mb-2 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
                    <div className="w-50 h-3 mb-1 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
                    <div className="w-50 h-3 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
                  </>
                ) : (
                  <>
                    <span className="block font-semibold">{fullName}</span>
                    <address className="not-italic font-normal">
                      {address?.personal_pres}
                    </address>
                  </>
                )}
              </dd>
            </dl>
          </div>
        </div>

        <div>
          <div className="grid space-y-3">
            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">
                Invoice number:
              </dt>
              <dd className="font-medium text-gray-800 dark:text-gray-200">
                ADUQ2189H1-0038
              </dd>
            </dl>

            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">Currency:</dt>
              <dd className="font-medium text-gray-800 dark:text-gray-200">
                PHP - Philippine Peso
              </dd>
            </dl>

            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">Due date:</dt>
              {loanLoading ? (
                <div className="w-20 h-4 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
              ) : (
                <dd className="font-medium text-gray-800 dark:text-gray-200">
                  10 Jan 2023
                </dd>
              )}
            </dl>

            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">
                Billing method:
              </dt>
              <dd className="font-medium text-gray-800 dark:text-gray-200">
                Send invoice
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-6 border border-gray-200 dark:border-gray-500 p-4 rounded-lg space-y-4">
        <div className="hidden sm:grid sm:grid-cols-5">
          <div className="text-xs font-medium text-gray-500 uppercase">
            Item
          </div>
          <div className="text-xs font-medium text-gray-500 uppercase">
            Brand
          </div>
          <div className="text-start text-xs font-medium text-gray-500 uppercase">
            Qty
          </div>
          <div className="text-start text-xs font-medium text-gray-500 uppercase">
            Color
          </div>
          <div className="text-end text-xs font-medium text-gray-500 uppercase">
            Tenure
          </div>
        </div>

        <div className="hidden sm:block border-b border-gray-200 dark:border-gray-500"></div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          <div className="col-span-full sm:col-span-1">
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Item
            </h5>
            {loanLoading ? (
              <div className="w-20 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
            ) : (
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {transactions[0].motorcycle?.name}
              </p>
            )}
          </div>
          <div className="col-span-full sm:col-span-1">
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Brand
            </h5>
            {loanLoading ? (
              <div className="w-20 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
            ) : (
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {transactions[0].motorcycle?.brand}
              </p>
            )}
          </div>

          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Qty
            </h5>
            {loanLoading ? (
              <div className="w-10 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
            ) : (
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {transactions[0].quantity}
              </p>
            )}
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Color
            </h5>
            {loanLoading ? (
              <div className="w-5 h-5 bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse" />
            ) : (
              <ColorLabel style={transactions[0].color || ""} />
            )}
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Tenure
            </h5>
            {loanLoading ? (
              <div className="sm:self-end w-10 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
            ) : (
              <p className="sm:text-end text-gray-800 dark:text-gray-200">
                {transactions[0].tenure} years
              </p>
            )}
          </div>
        </div>

        <div className="sm:hidden border-b border-gray-200"></div>
      </div>

      <div className="mt-8 flex sm:justify-end">
        <div className="w-full max-w-2xl sm:text-end space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Amount paid:</dt>
              {paymentLoading ? (
                <div className="w-20 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
              ) : (
                <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                  {payment?.amount}
                </dd>
              )}
            </dl>

            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Due balance:</dt>
              {paymentLoading ? (
                <div className="w-20 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
              ) : (
                <dd className="col-span-2 font-medium text-rose-600 dark:text-rose-500">
                  {payment?.currBalance}
                </dd>
              )}
            </dl>
          </div>
          <button
            onClick={() =>
              dispatch(toggleModal({ name: "receipt", value: modals.receipt }))
            }
            className="inline-flex items-center gap-2 py-3 text-sm text-gray-600 hover:text-rose-600 focus:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200 dark:text-gray-400 dark:hover:text-rose-500 dark:focus:text-white dark:hover:bg-gray-800">
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
