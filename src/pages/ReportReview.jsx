import React, { useEffect } from "react";
import FormTHead from "../components/tables/FormTHead";
import FormTH from "../components/tables/FormTH";
import FormTBody from "../components/tables/FormTBody";
import ApplicationInfoCard from "../components/cards/ApplicationInfoCard";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationEntity } from "../services/entities/Application";
import { FORM_LABELS, REPORT_LABELS } from "../constants/formFields";
import LeafletMap from "../components/maps/LeafletMap";
import ReadTD from "../components/tables/ReadTD";
import { ReportEntity } from "../services/entities/Report";
import {
  fetchLoan,
  getLoanId,
} from "../services/redux/slices/applicationSlice";
import { fetchReport } from "../services/redux/slices/reportSlice";
import LargeBadge from "../components/badges/LargeBadge";

export default function ReportReview() {
  const dispatch = useDispatch();
  const application = useSelector(ApplicationEntity);
  const report = useSelector(ReportEntity);
  const { loanLoading, loanID } = useSelector((state) => state.application);

  useEffect(() => {
    dispatch(getLoanId());
  }, []);

  useEffect(() => {
    if (loanID) {
      dispatch(fetchReport({ id: loanID }));
      dispatch(fetchLoan({ id: loanID, by: "id" }));
    }
  }, [loanID, dispatch]);

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900">
      <form className="max-w-3xl mx-auto p-4">
        <ApplicationInfoCard title="Credit Investigation Report">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Name
              </div>
              {loanLoading ? (
                <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
              ) : (
                <div className="font-medium text-gray-900 dark:text-white">
                  {application.fullName}
                </div>
              )}
            </div>

            {["birthDate", "birth_place"].map((val, i) => (
              <div key={i}>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {FORM_LABELS.personal_info[val]}
                </div>
                {loanLoading ? (
                  <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                ) : (
                  <div className="font-medium text-gray-900 dark:text-white">
                    {application[val]}
                  </div>
                )}
              </div>
            ))}
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

          <LeafletMap />

          <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
            Dependents:
          </h3>
          <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
            <table className="w-full border rounded-lg overflow-hidden">
              <FormTHead>
                <tr>
                  <FormTH label="Name" />
                  <FormTH label="Relationship" />
                  <FormTH label="Age" />
                  <FormTH label="School" />
                </tr>
              </FormTHead>
              <FormTBody>
                <tr>
                  <ReadTD>...</ReadTD>
                  <ReadTD>...</ReadTD>
                  <ReadTD>...</ReadTD>
                  <ReadTD>...</ReadTD>
                </tr>
              </FormTBody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
            Nearest Relatives:
          </h3>
          <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
            <table className="w-full border rounded-lg overflow-hidden">
              <FormTHead>
                <tr>
                  <FormTH label="Name" />
                  <FormTH label="Relationship" />
                  <FormTH label="Age" />
                  <FormTH label="School" />
                </tr>
              </FormTHead>
              <FormTBody>
                <tr>
                  <ReadTD>...</ReadTD>
                  <ReadTD>...</ReadTD>
                  <ReadTD>...</ReadTD>
                  <ReadTD>...</ReadTD>
                </tr>
              </FormTBody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
            Unit Applied:
          </h3>
          <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
            <table className="w-full border rounded-lg overflow-hidden">
              <FormTHead>
                <tr>
                  <FormTH label="Model" />
                  <FormTH label="Downpayment" />
                  <FormTH label="Terms Conditions" />
                </tr>
              </FormTHead>
              <FormTBody>
                <tr>
                  <ReadTD>...</ReadTD>
                  <ReadTD>...</ReadTD>
                  <ReadTD>...</ReadTD>
                </tr>
              </FormTBody>
            </table>
          </div>

          <section className="my-8">
            <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
              RECOMMENDATION:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {Object.entries(REPORT_LABELS).map(([key, label], i) => (
                <div key={i}>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {label}
                  </div>
                  {loanLoading ? (
                    <div className="w-40 h-6 mt-1 rounded-lg bg-gray-100 dark:bg-gray-600 animate-pulse" />
                  ) : (
                    <div className="font-medium text-gray-900 dark:text-white">
                      {report[key]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <h1 className="text-lg dark:text-white font-bold">
            Subject is recommended for
          </h1>
          <LargeBadge type={report.recommendation || ""} subtext={false} />
        </ApplicationInfoCard>
      </form>
    </div>
  );
}
