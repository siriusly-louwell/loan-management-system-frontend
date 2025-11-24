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

  const formattedDate = new Date(payment.created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function calculateAmortization({
    basePrice = 150000,
    rebate = 500,
    interestRate = 8,
    tenureYears = 2,
    downpayment = 20000,
  }) {
    // Step 1: Principal (Net Price)
    const principal = basePrice - downpayment - rebate;

    // Step 2: Monthly interest rate
    const monthlyInterest = interestRate / 100 / 12;

    // Step 3: Number of months
    const months = tenureYears * 12;

    // Step 4: Amortization formula
    const numerator = monthlyInterest * Math.pow(1 + monthlyInterest, months);
    const denominator = Math.pow(1 + monthlyInterest, months) - 1;

    const monthlyPayment = principal * (numerator / denominator);

    const totalMonthlyPayment = monthlyPayment;
    return {
      principal,
      monthlyPayment,
      totalPayable: monthlyPayment * months + downpayment,
      totalMonthlyPayment,
    };
  }

  console.log(transactions);
  console.log(payment);

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
            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">Invoice No.</dt>
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
            </dl>
            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">Status</dt>
              <dd className="text-gray-800 dark:text-gray-200">
                {loanLoading ? (
                  <div className="w-40 h-4 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
                ) : (
                  <span className="inline-flex items-center cursor-pointer gap-x-1.5 text-rose-600 dark:text-rose-500 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium">
                    {payment?.status}
                  </span>
                )}
              </dd>
            </dl>
          </div>
        </div>

        <div>
          <div className="grid space-y-3">
            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">
                Customer Name:
              </dt>
              <dd className="font-medium text-gray-800 dark:text-gray-200">
                {fullName}
              </dd>
            </dl>

            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">
                Contact Number:
              </dt>
              <dd className="font-medium text-gray-800 dark:text-gray-200">
                {}
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

            <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
              <dt className="min-w-36 max-w-50 text-gray-500">
                Loan Account Number:
              </dt>
              <dd className="font-medium text-gray-800 dark:text-gray-200">
                {} Sample Account Number
              </dd>
            </dl>
          </div>
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
              <dt className="min-w-36 max-w-50 text-gray-500">Cashier:</dt>
              <dd className="text-gray-800 dark:text-gray-200">
                {loanLoading ? (
                  <div className="w-40 h-4 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
                ) : (
                  <span className="inline-flex items-center cursor-pointer gap-x-1.5 text-rose-600 dark:text-rose-500 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium">
                    {fullName}
                  </span>
                )}
              </dd>
            </dl>
          </div>
        </div>

        <div>
          <div className="grid space-y-3"></div>
        </div>
      </div>

      <div className="mt-6 border border-gray-200 dark:border-gray-500 p-4 rounded-lg space-y-4">
        {transactions.map((transaction) => {
          const motorcycle = transaction.motorcycle;

          return (
            <>
              <div className="flex gap-2">
                <div>
                  <img
                    src={
                      motorcycle?.file_path
                        ? `${process.env.REACT_APP_API_URL}/storage/${motorcycle.file_path}`
                        : "https://placehold.co/250x250"
                    }
                    alt="motorcycle"
                    className="rounded-lg max-w-[250px] max-h-[250px]"
                  />
                </div>
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-5 gap-x-3 text-md">
                      <dt className="col-span-3 text-gray-500">
                        Brand / Model:
                      </dt>
                      {!motorcycle ? (
                        <div className="w-20 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
                      ) : (
                        <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                          {motorcycle?.brand + " " + motorcycle.name}
                        </dd>
                      )}
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3 text-md">
                      <dt className="col-span-3 text-gray-500">Engine No:</dt>
                      {!motorcycle ? (
                        <div className="w-20 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
                      ) : (
                        <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                          {motorcycle?.engine}
                        </dd>
                      )}
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3 text-md">
                      <dt className="col-span-3 text-gray-500">Chasis No:</dt>
                      {!motorcycle ? (
                        <div className="w-20 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
                      ) : (
                        <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                          {motorcycle?.compression}
                        </dd>
                      )}
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3 text-md">
                      <dt className="col-span-3 text-gray-500">Plate No:</dt>
                      {!motorcycle ? (
                        <div className="w-20 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
                      ) : (
                        <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                          {payment?.amount}
                        </dd>
                      )}
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3 text-md">
                      <dt className="col-span-3 text-gray-500">Color:</dt>
                      {paymentLoading ? (
                        <div className="w-20 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
                      ) : (
                        <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                          <ColorLabel style={transaction.color || ""} />
                        </dd>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>

      {false && (
        <>
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
        </>
      )}

      <div className="mt-8 flex sm:justify-end">
        <div className="w-full max-w-2xl sm:text-end space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Rebate:</dt>
              {paymentLoading ? (
                <div className="w-20 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
              ) : (
                <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                  P{transactions[0] ? transactions[0].motorcycle.rebate : 500}
                </dd>
              )}
            </dl>
            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">
                Monthly Amortization:
              </dt>
              {paymentLoading ? (
                <div className="w-20 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
              ) : (
                <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                  {calculateAmortization(
                    transactions[0]?.motorcycle.price ?? 150000,
                    transactions[0]?.motorcycle.rebate ?? 500,
                    transactions[0]?.motorcycle.interest ?? 8,
                    transactions[0]?.tenure ?? 2,
                    transactions[0]?.motorcycle.downpayment ?? 20000
                  ).monthlyPayment.toFixed(2)}
                </dd>
              )}
            </dl>
            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Penalty:</dt>
              {paymentLoading ? (
                <div className="w-20 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
              ) : (
                <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                  0
                </dd>
              )}
            </dl>

            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Other Charges:</dt>
              {paymentLoading ? (
                <div className="w-20 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
              ) : (
                <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                  0{" "}
                </dd>
              )}
            </dl>
            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-800 font-bold text-lg">
                Total Amount Paid:
              </dt>
              {paymentLoading ? (
                <div className="w-20 h-5 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
              ) : (
                <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200 font-bold text-lg">
                  {calculateAmortization(
                    transactions[0]?.motorcycle.price ?? 150000,
                    transactions[0]?.motorcycle.rebate ?? 500,
                    transactions[0]?.motorcycle.interest ?? 8,
                    transactions[0]?.tenure ?? 2,
                    transactions[0]?.motorcycle.downpayment ?? 20000
                  ).totalMonthlyPayment.toFixed(2)}
                </dd>
              )}
            </dl>
          </div>
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
