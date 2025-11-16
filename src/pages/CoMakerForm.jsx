import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApplicationInfoCard from "../components/cards/ApplicationInfoCard";
import { FORM_LABELS } from "../constants/formFields";
import ProfileHeader from "../components/cards/ProfileHeader";
import FileButton from "../components/buttons/FileButton";
import { ComakerEntity } from "../services/entities/ComakerInfo";
import { ApplicationEntity } from "../services/entities/Application";
import {
  fetchLoan,
  getLoanId,
} from "../services/redux/slices/applicationSlice";

export default function CoMakerForm() {
  const dispatch = useDispatch();
  const comaker = useSelector(ComakerEntity);
  const { address } = useSelector(ApplicationEntity);
  const { loanID, loanLoading } = useSelector((state) => state.application);

  useEffect(() => {
    dispatch(getLoanId());
  }, []);

  useEffect(() => {
    if (loanID) dispatch(fetchLoan({ id: loanID, by: "id" }));
  }, [loanID, dispatch]);

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900">
      <section className="max-w-3xl mx-auto p-4">
        <ProfileHeader
          name={comaker.fullName}
          gender={comaker.getGender}
          status={comaker.getStatus}
          email={comaker.email}
          contact={comaker.contact_num}
          img={comaker.imgURL}
          loading={loanLoading}
          address={address?.comaker_pres}>
          {loanLoading ? (
            <div className="flex space-x-3">
              <div className="w-16 h-5 rounded-md bg-gray-100 dark:bg-gray-600 animate-pulse" />
              <div className="w-16 h-5 rounded-md bg-gray-100 dark:bg-gray-600 animate-pulse" />
              <div className="w-16 h-5 rounded-md bg-gray-100 dark:bg-gray-600 animate-pulse" />
            </div>
          ) : (
            <>
              <FileButton name="Valid ID" link={comaker.sketch} />
              <FileButton name="ID Picture" link={comaker.imgURL} />
              <FileButton
                name="Proof of Residence"
                link={comaker.residenceImg}
              />
            </>
          )}
        </ProfileHeader>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Comaker Information
        </h1>

        <ApplicationInfoCard title="Personal Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {Object.entries(FORM_LABELS.comaker).map(([key, label], i) => (
              <div key={i}>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {label}
                </div>
                {loanLoading ? (
                  <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                ) : (
                  <div className="font-medium text-gray-900 dark:text-white">
                    {comaker[key]}
                  </div>
                )}
              </div>
            ))}
          </div>

          {["comaker_pres", "comaker_perm"].map((val, i) => (
            <div key={i} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {FORM_LABELS.address[val]}
              </h3>
              {loanLoading ? (
                <div className="w-80 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
              ) : (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {address[val] || ""}
                </span>
              )}
            </div>
          ))}
        </ApplicationInfoCard>

        <ApplicationInfoCard title="Spouse Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {Object.entries(FORM_LABELS.comaker_spouse).map(
              ([key, label], i) => (
                <div key={i}>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {label}
                  </div>
                  {loanLoading ? (
                    <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                  ) : (
                    <div className="font-medium text-gray-900 dark:text-white">
                      {comaker[key]}
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Father's Name
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["sp_father_first", "sp_father_middle", "sp_father_last"].map(
                (val, i) => (
                  <div key={i}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {FORM_LABELS.other[val]}
                    </div>
                    {loanLoading ? (
                      <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                    ) : (
                      <div className="font-medium text-gray-900 dark:text-white">
                        {comaker[val]}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Mother's Name
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["sp_mother_first", "sp_mother_middle", "sp_mother_last"].map(
                (val, i) => (
                  <div key={i}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {FORM_LABELS.other[val]}
                    </div>
                    {loanLoading ? (
                      <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                    ) : (
                      <div className="font-medium text-gray-900 dark:text-white">
                        {comaker[val]}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </ApplicationInfoCard>
      </section>
    </div>
  );
}
