import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApplicationInfoCard from "../components/cards/ApplicationInfoCard";
import { FORM_LABELS } from "../constants/formFields";
import { ApplicationEntity } from "../services/entities/Application";
import { EmploymentEntity } from "../services/entities/EmploymentInfo";
import { FamilyEntity } from "../services/entities/FamilyInfo";
import {
  fetchLoan,
  getLoanId,
} from "../services/redux/slices/applicationSlice";
import ProfileHeader from "../components/cards/ProfileHeader";
import LeafletMap from "../components/maps/LeafletMap";
import FileButton from "../components/buttons/FileButton";

export default function AppliedForm() {
  const dispatch = useDispatch();
  const application = useSelector(ApplicationEntity);
  const employmentInfo = useSelector(EmploymentEntity);
  const familyInfo = useSelector(FamilyEntity);
  const { loanID, loanLoading } = useSelector((state) => state.application);

  useEffect(() => {
    dispatch(getLoanId());
  }, []);

  useEffect(() => {
    if (loanID) dispatch(fetchLoan({ id: loanID, by: "id" }));
  }, [loanID, dispatch]);

  console.log(application);

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900">
      <section className="max-w-3xl mx-auto p-4">
        <ProfileHeader
          name={application.fullName}
          gender={application.getGender}
          status={application.getStatus}
          email={application.email}
          contact={application.contact_num}
          img={application.imgURL}
          loading={loanLoading}
          address={application.address?.personal_pres}>
          {loanLoading ? (
            <div className="flex space-x-3">
              <div className="w-16 h-5 rounded-md bg-gray-100 dark:bg-gray-600 animate-pulse" />
              <div className="w-16 h-5 rounded-md bg-gray-100 dark:bg-gray-600 animate-pulse" />
              <div className="w-16 h-5 rounded-md bg-gray-100 dark:bg-gray-600 animate-pulse" />
            </div>
          ) : (
            <>
              <FileButton name="Valid ID" link={application.validID} />
              <FileButton name="ID Picture" link={application.imgURL} />
              <FileButton
                name="Proof of Residence"
                link={application.residenceImg}
              />
            </>
          )}
        </ProfileHeader>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Application Information
        </h1>

        <ApplicationInfoCard title="Personal Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {Object.entries(FORM_LABELS.personal_info).map(
              ([key, label], i) => (
                <div key={i}>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {label}
                  </div>
                  {loanLoading ? (
                    <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                  ) : (
                    <div className="font-medium text-gray-900 dark:text-white">
                      {application[key]}
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          {["comm_standing", "home_description"].map((val, i) => (
            <div key={i} className="mb-8">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {FORM_LABELS.other[val]}
              </div>
              {loanLoading ? (
                <div className="w-80 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
              ) : (
                <div className="font-medium text-gray-900 dark:text-white whitespace-pre-line">
                  {application[val]}
                </div>
              )}
            </div>
          ))}

          {["personal_pres", "personal_prev"].map((val, i) => (
            <div key={i} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {FORM_LABELS.address[val]}
              </h3>
              {loanLoading ? (
                <div className="w-80 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
              ) : (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {application.address[val] || ""}
                </span>
              )}
            </div>
          ))}

          <LeafletMap
            display={true}
            coordinates={{
              lat: application.address.lat,
              lng: application.address.lng,
            }}
          />
        </ApplicationInfoCard>

        <ApplicationInfoCard title="Employment Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {Object.entries(FORM_LABELS.employment_info.A).map(
              ([key, label], i) => (
                <div key={i}>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {label}
                  </div>
                  {loanLoading ? (
                    <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                  ) : (
                    <div className="font-medium text-gray-900 dark:text-white">
                      {employmentInfo[key]}
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Income
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(FORM_LABELS.employment_info.B).map(
                ([key, label], i) => (
                  <div key={i}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {label}
                    </div>
                    {loanLoading ? (
                      <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                    ) : (
                      <div className="font-medium text-gray-900 dark:text-white">
                        {employmentInfo[key]}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Expenses
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(FORM_LABELS.employment_info.C).map(
                ([key, label], i) => (
                  <div key={i}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {label}
                    </div>
                    {loanLoading ? (
                      <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                    ) : (
                      <div className="font-medium text-gray-900 dark:text-white">
                        {employmentInfo[key]}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </ApplicationInfoCard>

        <ApplicationInfoCard title="Family Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {Object.entries(FORM_LABELS.family_info).map(([key, label], i) => (
              <div key={i}>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {label}
                </div>
                {loanLoading ? (
                  <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                ) : (
                  <div className="font-medium text-gray-900 dark:text-white">
                    {familyInfo[key]}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Father's Name
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["father_first", "father_middle", "father_last"].map(
                (val, i) => (
                  <div key={i}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {FORM_LABELS.other[val]}
                    </div>
                    {loanLoading ? (
                      <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                    ) : (
                      <div className="font-medium text-gray-900 dark:text-white">
                        {familyInfo[val]}
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
              {["mother_first", "mother_middle", "mother_last"].map(
                (val, i) => (
                  <div key={i}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {FORM_LABELS.other[val]}
                    </div>
                    {loanLoading ? (
                      <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                    ) : (
                      <div className="font-medium text-gray-900 dark:text-white">
                        {familyInfo[val]}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {["parent_pres", "parent_prev", "spouse_pres", "spouse_prev"].map(
            (val, i) => (
              <div key={i} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  {FORM_LABELS.address[val]}
                </h3>
                {loanLoading ? (
                  <div className="w-80 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {application.address[val] || ""}
                  </span>
                )}
              </div>
            )
          )}
        </ApplicationInfoCard>
      </section>
    </div>
  );
}
