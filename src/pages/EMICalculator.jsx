import React, { useState, useEffect } from "react";
import StepCard from "../components/cards/StepCard";
import BttnSmall from "../components/buttons/BttnSmall";
import FormInput from "../components/inputs/FormInput";
import SmallSpin from "../components/loading components/SmallSpin";
import { useSelector } from "react-redux";
import { UnitEntity } from "../services/entities/Unit";

export default function EMICalculator({ staff }) {
  const unit = useSelector(UnitEntity);
  const { unitLoading } = useSelector((state) => state.unit);
  const [downPayment, setDownPayment] = useState();
  const [tenure, setTenure] = useState(12);

  useEffect(() => {
    setDownPayment(unit?.downpayment);
  }, [unit?.downpayment]);

  useEffect(() => {
    if (downPayment < unit?.downpayment) {
      document.getElementById("down_warn").style.display = "block";
      document.getElementById("downpayment").style.outline = "1px solid red";
      document.getElementById("downpayment").style.border = "1px solid red";
    } else {
      document.getElementById("downpayment").style.border = "1px solid #9CA3AF";
      document.getElementById("downpayment").style.outline =
        "1px solid #9CA3AF";
      document.getElementById("down_warn").style.display = "none";
    }
  }, [downPayment]);

  const loanAmount = unit?.price - downPayment;
  const monthlyRate = unit?.interest / 12 / 100;

  const emi =
    loanAmount === 0 || unit?.interest === 0
      ? loanAmount / tenure
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1);

  return (
    <div className="w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div className="w-full justify-items-center px-5">
        <h1 className="dark:text-white font-bold text-3xl">
          Motorcycle Loan Calculator
        </h1>
        <p className="text-gray-800 dark:text-gray-300">
          Calculate the monthly EMI based on motorcycle loan amount, tenure and
          interest rate
        </p>
      </div>

      <div className="py-20 sm:flex sm:space-x-20 items-center px-4 justify-center">
        <div className="sm:w-1/2 p-2">
          <div className="mb-6">
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-700 dark:text-gray-200">
                Downpayment
              </h3>
              <h3 className="font-medium text-gray-700 flex gap-x-2 dark:text-gray-200">
                Minimum Payment:{" "}
                {unitLoading ? (
                  <SmallSpin size={20} />
                ) : (
                  <span className="font-bold text-rose-600">
                    ₱{parseFloat(unit?.downpayment).toLocaleString()}
                  </span>
                )}
              </h3>
              {/* <span className="font-bold text-blue-600">{downPaymentPercent}%</span> */}
            </div>
            <FormInput
              type="number"
              id="downpayment"
              value={downPayment}
              onchange={(e) => setDownPayment(Number(e.target.value))}
              placeholder="Input downpayment here"
            />
            <p id="down_warn" className="text-red-500">
              * Downpayment must not go below the minimum payment
            </p>
            {/* <input type="range" min="10" max="60" step="10" onChange={(e) => setDownPaymentPercent(Number(e.target.value))} className="w-full h-2 bg-gray-300 dark:bg-gray-400 rounded-lg appearance-none cursor-pointer" />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>10%</span>
                            <span>20%</span>
                            <span>30%</span>
                            <span>40%</span>
                            <span>50%</span>
                            <span>60%</span>
                        </div> */}
          </div>

          {/* <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium text-gray-700 dark:text-gray-200">Rate of Interest</h3>
                            <span className="font-bold text-blue-600">{interestRate}%</span>
                        </div>
                        <input type="range" min="6" max="36" step="1" onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full h-2 bg-gray-300 dark:bg-gray-400 rounded-lg appearance-none cursor-pointer" />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>6%</span>
                            <span>9%</span>
                            <span>12%</span>
                            <span>15%</span>
                            <span>18%</span>
                            <span>21%</span>
                            <span>24%</span>
                            <span>27%</span>
                            <span>30%</span>
                            <span>33%</span>
                            <span>36%</span>
                        </div>
                    </div> */}

          <div className="mb-8">
            <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-3">
              Loan Tenure
            </h3>
            <div className="grid grid-cols-5 gap-2">
              <input
                type="radio"
                value
                defaultChecked={tenure === 12}
                className="hidden"
              />
              {unitLoading ? (
                <>
                  <div className="bg-gray-300 dark:bg-gray-500 py-4 px-3 rounded-lg text-sm font-medium transition animate-pulse"></div>
                  <div className="bg-gray-300 dark:bg-gray-500 py-4 px-3 rounded-lg text-sm font-medium transition animate-pulse"></div>
                  <div className="bg-gray-300 dark:bg-gray-500 py-4 px-3 rounded-lg text-sm font-medium transition animate-pulse"></div>
                  <div className="bg-gray-300 dark:bg-gray-500 py-4 px-3 rounded-lg text-sm font-medium transition animate-pulse"></div>
                  <div className="bg-gray-300 dark:bg-gray-500 py-4 px-3 rounded-lg text-sm font-medium transition animate-pulse"></div>
                </>
              ) : (
                [...Array(unit?.tenure)].map((_, i) => (
                  <BttnSmall
                    key={i + 1}
                    text={i + 1 + " Year"}
                    click={() => setTenure(12 * (i + 1))}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {unitLoading ? (
          <div className="bg-gray-200 dark:bg-gray-600 h-40 rounded-2x1 shadow-lg sm:w-1/3 flex items-center justify-center animate-pulse rounded-xl p-10 mb-4">
            <SmallSpin size={40} />
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-700 rounded-2x1 shadow-lg sm:w-1/3 justify-items-center rounded-xl p-5 mb-4">
            <p className="text-xl font-bold text-gray-800 dark:text-white mb-5">
              {unit?.brand} - {unit?.name}
            </p>
            <div className="flex justify-between items-center space-x-5 mb-4">
              <div className="justify-items-center">
                <p className="text-gray-500 dark:text-gray-100 text-sm">
                  Down Payment
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  ₱{parseFloat(downPayment).toLocaleString()}
                </p>
              </div>
              <div className="justify-items-center">
                <p className="text-gray-500 dark:text-gray-100 text-sm">
                  Loan Amount
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  ₱{parseFloat(loanAmount).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="border-t w-full justify-items-center border-gray-200 py-4">
              <p className="text-gray-500 dark:text-gray-100 text-sm">
                Monthly EMI
              </p>
              <p className="text-2xl font-bold text-rose-600 dark:text-rose-500">
                ₱{parseFloat(emi).toLocaleString()}
              </p>
            </div>

            {/* <Button text="Apply Loan" onclick={() => navigate('/customer/apply')} /> */}
          </div>
        )}
      </div>

      {!staff ? (
        <div className="sm:px-10 py-20 w-full">
          <div className="bg-rose-200 dark:bg-gray-700 p-5 rounded-xl shadow-lg justify-items-center space-y-5">
            <h1 className="dark:text-white font-bold text-3xl">
              How Do I Apply?
            </h1>
            <ul className="relative flex flex-col md:flex-row gap-2 w-full">
              <StepCard
                num={1}
                label="Calculate your Loan"
                context="Calculate your motorcycle loan below and adjust the the fields to fit your preferences."
              />
              <StepCard
                num={2}
                label="Fillout the Application"
                context="After you calculate your estimated monthly EMI, click 'Apply Loan' and apply by filling out an application form."
              />
              <StepCard
                num={3}
                label="Submit your Documents"
                context={
                  <>
                    <span>
                      After filling out the application form, upload your
                      documents to the system.
                    </span>
                    <ul className="mt-3 ml-4 list-disc space-y-2 text-sm">
                      <li>Valid ID</li>
                      <li>ID picture</li>
                      <li>Proof of Income</li>
                      <li>Proof of Residence</li>
                    </ul>
                  </>
                }
                // context="After filling out the application form, upload your documents to the system."
              />
              <StepCard
                num={4}
                label="Leave the rest to us"
                context="Your loan will be processed. We will notify you once it is done."
              />
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
