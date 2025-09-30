import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/buttons/Button";
import FormInput from "../components/inputs/FormInput";
import FormTHead from "../components/tables/FormTHead";
import FormTH from "../components/tables/FormTH";
import FormTBody from "../components/tables/FormTBody";
import FormTextarea from "../components/inputs/FormTextarea";
import FormCheck from "../components/checkboxes/FormCheck";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoan,
  getLoanId,
} from "../services/redux/slices/applicationSlice";
import { ApplicationEntity } from "../services/entities/Application";
import ApplicationInfoCard from "../components/cards/ApplicationInfoCard";
import { FORM_LABELS } from "../constants/formFields";
import LeafletMap from "../components/maps/LeafletMap";
import ReadTD from "../components/tables/ReadTD";
import { setAlert, setLoading } from "../services/redux/slices/uiSlice";
import { submitReport } from "../services/redux/slices/reportSlice";

export default function CIReport() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const application = useSelector(ApplicationEntity);
  const { loanLoading } = useSelector((state) => state.application);
  const [report, setReport] = useState({});

  useEffect(() => {
    dispatch(getLoanId());
  }, []);

  useEffect(() => {
    if (state?.id) dispatch(fetchLoan({ id: state?.id, by: "id" }));
  }, [state?.id, dispatch]);

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(setLoading({ isActive: true, text: "Saving data..." }));

    try {
      const response = await dispatch(submitReport(report)).unwrap();

      dispatch(setLoading({ isActive: false }));
      dispatch(setAlert({ message: response.message, type: response.type }));
      if (response.type === "success") navigate("/ci/evaluation");
    } catch (error) {
      console.error("Error: ", error);
      dispatch(setLoading({ isActive: false }));
      dispatch(
        setAlert({
          message: "Something went wrong. Please try again",
          type: "error",
        })
      );
    }
  }

  function handleChange(event) {
    setReport({
      ...report,
      [event.target.name]: event.target.value,
    });
  }

  return (
      <div className="w-full bg-gray-100 dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
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
          </ApplicationInfoCard>

          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
              RECOMMENDATION:
            </h3>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Subject is recommended for
                </label>
                <div className="space-y-4 sm:flex sm:space-y-0">
                  <FormCheck
                    name="recommendation"
                    type="radio"
                    id="recomm-1"
                    label="Approval"
                    value="approval"
                    check={report.recommendation === "approval"}
                    change={handleChange}
                    require={true}
                  />
                  <FormCheck
                    name="recommendation"
                    type="radio"
                    id="recomm-2"
                    label="Disapproval"
                    value="disapproval"
                    check={report.recommendation === "disapproval"}
                    change={handleChange}
                  />
                </div>
              </div>
              <FormTextarea
                name="remarks"
                id="remarks"
                label="Other remarks"
                placeholder="Write remarks here"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
              Unit verification:
            </h3>
            <div className="grid gap-4 flex items-center mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
              <FormInput
                label="First Unit applied"
                type="text"
                name="first_unit"
                id="name"
                value={report.first_unit}
                onchange={handleChange}
                placeholder="Type unit name here"
              />
              {/* <img
                src={`http://127.0.0.1:8000/storage/${appReport.sketch}`}
                className="rounded rounded-lg w-20"
                alt="Sketch"
              /> */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Delivered?
                </label>
                <div className="space-y-4 sm:flex sm:space-y-0">
                  <FormCheck
                    name="delivered"
                    type="radio"
                    id="deliver-1"
                    label="Yes"
                    value="yes"
                    check={report.delivered === "yes"}
                    change={handleChange}
                  />
                  <FormCheck
                    name="delivered"
                    type="radio"
                    id="deliver-2"
                    label="No"
                    value="no"
                    check={report.delivered === "no"}
                    change={handleChange}
                  />
                </div>
              </div>
              <FormInput
                label="Outlet"
                type="text"
                name="outlet"
                id="outlet"
                value={report.outlet}
                onchange={handleChange}
                placeholder="Type outlet here"
              />
            </div>

            <div className="space-y-4 sm:flex sm:w-1/3 sm:space-y-0 sm:space-x-4">
              <Button bttnType="submit" text="Done" />
            </div>
          </div>
        </form>
      </div>
  );
}
