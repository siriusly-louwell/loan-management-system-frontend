import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Button from "../components/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../services/redux/slices/uiSlice";
import ApplicationInfoCard from "../components/cards/ApplicationInfoCard";
import { FORM_LABELS } from "../constants/formFields";
import { ApplicationEntity } from "../services/entities/Application";
import { EmploymentEntity } from "../services/entities/EmploymentInfo";
import { FamilyEntity } from "../services/entities/FamilyInfo";
import { fetchLoan } from "../services/redux/slices/applicationSlice";

export default function AppliedForm({ url }) {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { state } = useLocation();
  // const location = useLocation();
  // const id = state?.id;
  //   const [currentIndex, setCurrentIndex] = useState(0);
  const application = useSelector(ApplicationEntity);
  const employmentInfo = useSelector(EmploymentEntity);
  const familyInfo = useSelector(FamilyEntity);
  const { loanId } = useSelector((state) => state.application);
  // const { pageRoute } = useSelector((state) => state.ui);
  // const routerPaths = useMemo(
  //   () => [
  //     `${url}/apply`,
  //     `${url}/apply/employinfo`,
  //     `${url}/apply/familyinfo`,
  //     `${url}/apply/requirements`,
  //   ],
  //   []
  // );
  // const [applicant, setApplicant] = useState({ view: true });

  // useEffect(() => {
  //   fetch(`http://127.0.0.1:8000/api/application/${id}?by=id`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setApplicant({ ...applicant, ...data });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data: ", error);
  //     });
  // }, []);

  useEffect(() => {
    dispatch(fetchLoan({ id: loanId, by: "id" }));
    // navigate(pageRoute);

    // window.scrollTo(0, 0);
  }, []);

  // const address = applicant.address;
  // const disable = true;

  return (
    // <div className="overflow-y-auto overflow-x-hidden sm:flex justify-center fixed bg-gray-400 p-4 dark:bg-gray-700 top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
    //   <div className="relative p-4 w-full max-w-5xl h-full md:h-auto">
    //     <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
    //       <div className="flex justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
    //         <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
    //           APPLICATION FORM
    //         </h3>
    //       </div>
    //       <form>
    //         {address && <Outlet context={{ applicant, address, disable }} />}

    //         <div className="space-y-4 sm:flex sm:w-1/3 sm:space-y-0 sm:space-x-4">
    //           {pageNum > 0 && (
    //             <Button
    //               text="Back"
    //               bttnType="button"
    //               onclick={() => dispatch(prevPage("admin"))}
    //             />
    //           )}
    //           {pageNum < routerPaths.length - 1 ? (
    //             <Button
    //               text="Next"
    //               bttnType="button"
    //               onclick={() => dispatch(nextPage("admin"))}
    //             />
    //           ) : (
    //             <Button
    //               text="Done"
    //               bttnType="button"
    //               onclick={() =>
    //                 navigate(`${url}/loan`, { state: { id: applicant.id } })
    //               }
    //             />
    //           )}
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>

    <div className="w-full bg-gray-100 dark:bg-gray-900">
      <section className="max-w-3xl mx-auto p-4">
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-4">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold text-primary-700 dark:text-white">
              LJ
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white truncate">
                Louwell Jay A. Bernalte
              </h2>
              <div className="flex flex-wrap gap-2 items-center mt-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Male
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    true
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                  Status
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Farm 2 Dapco, Panabo City, Davao del Norte
              </span>
            </div>

            <div className="flex flex-col gap-4 sm:gap-y-1 text-center sm:text-right">
              <span className="text-sm text-gray-500 font-medium dark:text-white">
                bernaltelouwell23@gmail.com
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                09678575807
              </span>
            </div>
          </div>
        </section>

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
                  <div className="font-medium text-gray-900 dark:text-white">
                    {application[key]}
                  </div>
                </div>
              )
            )}
          </div>

          {["comm_standing", "home_description"].map((val, i) => (
            <div key={i} className="mb-8">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {FORM_LABELS.other[val]}
              </div>
              <div className="font-medium text-gray-900 dark:text-white whitespace-pre-line">
                {application[val]}
              </div>
            </div>
          ))}

          {["personal_pres", "personal_prev"].map((val, i) => (
            <div key={i} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {FORM_LABELS.address[val]}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {application.address[val] || ""}
              </span>
            </div>
          ))}
        </ApplicationInfoCard>

        <ApplicationInfoCard title="Employment Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {Object.entries(FORM_LABELS.employment_info.A).map(
              ([key, label], i) => (
                <div key={i}>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {label}
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {employmentInfo[key]}
                  </div>
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
                    <div className="font-medium text-gray-900 dark:text-white">
                      {employmentInfo[key]}
                    </div>
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
                    <div className="font-medium text-gray-900 dark:text-white">
                      {employmentInfo[key]}
                    </div>
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
                <div className="font-medium text-gray-900 dark:text-white">
                  {familyInfo[key]}
                </div>
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
                    <div className="font-medium text-gray-900 dark:text-white">
                      {familyInfo[val]}
                    </div>
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
                    <div className="font-medium text-gray-900 dark:text-white">
                      {familyInfo[val]}
                    </div>
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
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {application.address[val] || ""}
                </span>
              </div>
            )
          )}
        </ApplicationInfoCard>
      </section>
    </div>
  );
}
