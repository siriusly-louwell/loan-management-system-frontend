import React from "react";
import { useSelector } from "react-redux";
import { ApplicationEntity } from "../services/entities/Application";
import { EmploymentEntity } from "../services/entities/EmploymentInfo";
import { FamilyEntity } from "../services/entities/FamilyInfo";
import { useNavigate } from "react-router-dom";
import { UserEntity } from "../services/entities/User";
import { LoanEntity } from "../services/entities/Loan";

export default function AppliedFormMini() {
  const navigate = useNavigate();
  const { role } = useSelector(UserEntity);
  const loan = useSelector(LoanEntity);
  const application = useSelector(ApplicationEntity);
  const employmentInfo = useSelector(EmploymentEntity);
  const familyInfo = useSelector(FamilyEntity);
  const { loanLoading } = useSelector((state) => state.application);

  let loadingSkeletonMini = (
    <div className="w-75 h-5 rounded-md bg-gray-100 dark:bg-gray-600 animate-pulse" />
  );

  return (
    <div className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-md">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Applicant Overview
        </h2>
        <button
          className="text-sm px-3 py-1.5 rounded-md bg-rose-600 text-white hover:bg-rose-500 transition-colors duration-200"
          onClick={() =>
            navigate(`/${role}/application`, {
              state: { id: loan.id },
            })
          }>
          View Full Details
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Full Name</p>
          {loanLoading ? (
            loadingSkeletonMini
          ) : (
            <p className="font-medium text-gray-900 dark:text-white">
              {application.fullName}
            </p>
          )}
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400">Email</p>
          {loanLoading ? (
            loadingSkeletonMini
          ) : (
            <p className="font-medium text-gray-900 dark:text-white">
              {application.email}
            </p>
          )}
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400">Contact</p>
          {loanLoading ? (
            loadingSkeletonMini
          ) : (
            <p className="font-medium text-gray-900 dark:text-white">
              {application.contact_num}
            </p>
          )}
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400">Address</p>
          {loanLoading ? (
            loadingSkeletonMini
          ) : (
            <p className="font-medium text-gray-900 dark:text-white">
              {application.address?.personal_pres || "N/A"}
            </p>
          )}
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400">Employment</p>
          {loanLoading ? (
            loadingSkeletonMini
          ) : (
            <p className="font-medium text-gray-900 dark:text-white">
              {employmentInfo.position || "N/A"}
            </p>
          )}
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400">Monthly Income</p>
          {loanLoading ? (
            loadingSkeletonMini
          ) : (
            <p className="font-medium text-gray-900 dark:text-white">
              ₱{employmentInfo.monthly_income || "N/A"}
            </p>
          )}
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400">Marital Status</p>
          {loanLoading ? (
            loadingSkeletonMini
          ) : (
            <p className="font-medium text-gray-900 dark:text-white">
              {familyInfo.status || "N/A"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
