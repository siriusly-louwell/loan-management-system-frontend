import React, { useState, useEffect } from "react";
import Button from "../components/buttons/Button";
import SmallUpArrow from "../assets/icons/SmallUpArrow";
import LoanList from "../components/LoanList";
import PfpLabel from "../components/PfpLabel";
import Search from "../assets/icons/Search";
import SearchInput from "../components/inputs/SearchInput";
import EmptySearch from "../components/empty states/EmptySearch";
import CustomBadge from "../components/badges/CustomBadge";
import AddPayment from "../components/AddPayment";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoan } from "../services/redux/slices/applicationSlice";
import useDebounce from "../hooks/useDebounce";
import AccDetailSkeleton from "../components/loading components/AccDetailSkeleton";
import { toggleModal } from "../services/redux/slices/uiSlice";
import { LoanEntity } from "../services/entities/Loan";

export default function Cashier() {
  const [id, setId] = useState({ search: "" });
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);
  const { loan, loanLoading } = useSelector((state) => state.application);
  const { downpayment, initialBalance, dateIssued } = useSelector(LoanEntity);
  const search = useDebounce(id.search, 500);
  const emptySearch = search !== "";
  const emptyObj = Object.keys(loan).length === 0;

  useEffect(() => {
    if (id.search !== "")
      dispatch(fetchLoan({ id: search, by: "record_id", stff: "record_id" }));
  }, [dispatch, search]);

  return (
    <section className="bg-gray-100 py-8 antialiased dark:bg-gray-800 md:py-16">
      <form action="#" className="mx-auto max-w-screen-xl px-2 2xl:px-0">
        <div className="lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <div className="w-1/2">
                <label
                  htmlFor="applicant-search"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Find Applicant
                </label>
                <SearchInput
                  name="findApp"
                  id="applicant-search"
                  value={id}
                  change={setId}
                  placeholder="Search record ID here...">
                  <Search />
                </SearchInput>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Account Details
              </h2>

              {loanLoading && emptySearch ? (
                <AccDetailSkeleton />
              ) : emptySearch && emptyObj ? (
                <div className="flex w-full py-20 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-600">
                  <p className="text-gray-400 dark:text-gray-700 text-lg font-small">
                    Record doesn't exist
                  </p>
                </div>
              ) : emptyObj ? (
                <EmptySearch
                  label="No data to show"
                  context="Use the search bar to find applicants"
                />
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex space-x-4 items-center">
                    <img
                      className="h-16 w-16 rounded-lg"
                      src={loan.imgURL}
                      alt="loan avatar"
                    />
                    <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                      {loan.fullName}
                    </h2>
                    <span>
                      <CustomBadge
                        text={loan.status.text}
                        color={loan.status.color}
                      />
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Credit Score:
                    </h2>
                    <h2 className="flex items-center text-xl font-bold leading-none text-green-400 sm:text-2xl">
                      67
                    </h2>
                    <span className="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                      <SmallUpArrow />
                      15%
                    </span>
                  </div>
                  <div className="grid gap-4 sm:col-span-2 sm:grid-cols-3">
                    <PfpLabel caption="Salary" label={loan.parsedSalary} />
                    <PfpLabel caption="Co-maker" label="John Doe" />
                    <PfpLabel
                      caption="Contact Number"
                      label={loan.contact_num}
                    />
                    <PfpLabel caption="TIN Number" label={loan.tin} />
                    <PfpLabel caption="SSS/GSIS Number" label={loan.sss} />
                    <PfpLabel caption="Email Address" label={loan.email} />
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Unit:
                  </h2>
                  <div className="divide-y grid sm:col-span-2 sm:grid-cols-2 divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-600">
                    {loan.transactions.map((trans) => (
                      <LoanList
                        key={trans.id}
                        downpayment={trans.downpayment}
                        color={trans.color}
                        price={trans.motorcycle.price}
                        units={trans.quantity}
                        img={trans.motorcycle.file_path}
                        name={trans.motorcycle.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 w-full sticky top-10 space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Payment
                </h2>
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Status
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    {emptyObj ? "- - -" : "On time"}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Res. Certificate number
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    {emptyObj ? "- - -" : "#4859JS33"}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Issued on
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    {emptyObj ? "- - -" : dateIssued}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Issued at
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    {emptyObj ? "- - -" : "Rhean Motor Center"}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Previous Balance
                  </dt>
                  <dd className="text-base font-medium text-red-500">
                    {emptyObj ? "- - -" : initialBalance}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Amount Paid
                  </dt>
                  <dd className="text-base font-medium text-green-500">
                    {emptyObj ? "- - -" : downpayment}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Payment Method
                  </dt>
                  <dd className="text-base font-medium text-green-500">
                    {emptyObj ? "- - -" : "Cash"}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Current Balance
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    {emptyObj ? "- - -" : initialBalance}
                  </dd>
                </dl>

                <dl className="mt-5">
                  <Button
                    text="Add Payment"
                    bttnType="button"
                    onclick={() => {
                      if (Object.keys(loan).length > 0)
                        dispatch(
                          toggleModal({
                            name: "addPayment",
                            value: modals.addPayment,
                          })
                        );
                    }}
                  />
                </dl>
              </div>
            </div>
          </div>
        </div>
      </form>
      {Object.keys(loan).length > 0 && <AddPayment id={loan.id} />}
    </section>
  );
}
