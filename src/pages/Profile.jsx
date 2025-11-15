import React, { useEffect } from "react";
import PfpLabel from "../components/PfpLabel";
import CustomBttn from "../components/buttons/CustomBttn";
import Edit from "../assets/icons/Edit";
import LogRow from "../components/tables/LogRow";
import ProfileCard from "../components/cards/ProfileCard";
import BigCart from "../assets/icons/BigCart";
import BigStar from "../assets/icons/BigStar";
import { useDispatch, useSelector } from "react-redux";
import ImageSkeleton from "../components/loading components/ImageSkeleton";
import { ApplicationEntity } from "../services/entities/Application";
import { fetchScore } from "../services/redux/slices/creditSlice";
import { Ban, Clock } from "lucide-react";
import CustomBadge from "./../components/badges/CustomBadge";
import {
  fetchApplicants,
  fetchLoan,
  getLoanId,
  saveLoan,
} from "../services/redux/slices/applicationSlice";
import InvoiceRowSkeleton from "../components/loading components/InvoiceRowSkeleton";

export default function Profile() {
  const loan = useSelector(ApplicationEntity);
  const dispatch = useDispatch();
  const { creditScore, creditLoading } = useSelector((state) => state.credit);
  const { loanID, appsLoading, loanLoading, applications } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    dispatch(getLoanId());
  }, []);

  useEffect(() => {
    if (loanID) dispatch(fetchLoan({ id: loanID, by: "id" }));
    if (loan.user_id) {
      dispatch(fetchScore({ id: loan.user_id }));
      dispatch(fetchApplicants({ perPage: 5, isCustomer: loan.user_id }));
    }
  }, [loan.user_id, loanID, dispatch]);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-8">
      <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
        <BttnwithIcon
          click={() => (window.location = "../admin/accounts/customers")}
        >
          <ArrowBigLeftDash />
        </BttnwithIcon>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:mb-6">
          Profile Information
        </h2>
        <div className="grid grid-cols-2 gap-x-6 border-b border-t border-gray-200 py-2 dark:border-gray-700 md:py-2 lg:grid-cols-4 xl:gap-16">
          <ProfileCard
            label="Credit Score"
            amount={creditScore.score?.value}
            icon={<BigStar />}
            type={creditScore.score?.type}
            percent={creditScore.score?.difference}
            loading={creditLoading}
            path="/admin/credits"
          />
          <ProfileCard
            label="Loans Made"
            amount={creditScore.total_loans?.value}
            icon={<BigCart />}
            type={creditScore.total_loans?.type}
            percent={creditScore.total_loans?.difference}
            loading={creditLoading}
            path="/admin/customer-loans"
          />
          <ProfileCard
            label="Defaulted Loans"
            amount={creditScore.defaulted_loans?.value}
            icon={<Ban strokeWidth={3} className="mb-3 dark:text-gray-400" />}
            type={creditScore.defaulted_loans?.type}
            percent={creditScore.defaulted_loans?.difference}
            loading={creditLoading}
            path="/admin/customer-loans"
          />
          <ProfileCard
            label="Late Payments"
            amount={creditScore.late_payments?.value}
            icon={<Clock strokeWidth={3} className="mb-3 dark:text-gray-400" />}
            type={creditScore.late_payments?.type}
            percent={creditScore.late_payments?.difference}
            loading={creditLoading}
            path="/admin/customer-payments"
          />
        </div>
        <div className="py-4 md:py-8">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
            <div className="space-y-4">
              <div className="flex space-x-4 items-center">
                {loanLoading ? (
                  <div className="h-20 w-20">
                    <ImageSkeleton size={10} />
                  </div>
                ) : (
                  <img
                    className="h-20 w-20 rounded-lg object-cover"
                    src={loan.imgURL}
                    alt="profile"
                  />
                )}
                {loanLoading ? (
                  <div className="w-80 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
                ) : (
                  <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                    {loan.fullName}
                  </h2>
                )}
              </div>
              <PfpLabel
                caption="Email Address"
                label={loan.email}
                loading={loanLoading}
              />
              <PfpLabel
                caption="Current Address"
                label={loan.address.personal_pres}
                loading={loanLoading}
              />
              <PfpLabel
                caption="SSS/GSIS Number"
                label={loan.sss}
                loading={loanLoading}
              />
              <PfpLabel
                caption="TIN Number"
                label={loan.tin}
                loading={loanLoading}
              />
            </div>
            <div className="space-y-4">
              <PfpLabel
                caption="Gender"
                label={loan.getGender}
                loading={loanLoading}
              />
              <PfpLabel
                caption="Mobile Number"
                label={loan.contact_num}
                loading={loanLoading}
              />
              <PfpLabel
                caption="Employment Status"
                label={loan.employment_status}
                loading={loanLoading}
              />
              <PfpLabel
                caption="Employer"
                label={loan.employer}
                loading={loanLoading}
              />
              <PfpLabel
                caption="Employer Address"
                label={loan.employer_address}
                loading={loanLoading}
              />
            </div>
          </div>
          <CustomBttn
            text="Edit profile"
            classname="inline-flex w-full items-center justify-center rounded-lg bg-rose-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 sm:w-auto"
          >
            <Edit />
          </CustomBttn>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-8">
          <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Recent loans
          </h3>
          {appsLoading || loanLoading ? (
            <InvoiceRowSkeleton num={5} />
          ) : (
            applications.map((loan) => (
              <LogRow
                key={loan.id}
                click={() => dispatch(saveLoan(loan.id))}
                id={loan.record_id}
                name={loan.fullName}
                date={loan.applied_at}
                badge={
                  <CustomBadge
                    text={loan.status.text}
                    color={loan.status.color}
                  />
                }
                path="/admin/loan"
                bttnText="View Details"
                state={loan.id}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
