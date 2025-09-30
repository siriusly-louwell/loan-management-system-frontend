import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/buttons/Button";
import FormInput from "../components/inputs/FormInput";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import Plus from "../assets/icons/Plus";
import FormTHead from "../components/tables/FormTHead";
import FormTH from "../components/tables/FormTH";
import FormTBody from "../components/tables/FormTBody";
import FormTD from "../components/tables/FormTD";
import FormTextarea from "../components/inputs/FormTextarea";
import FormCheck from "../components/checkboxes/FormCheck";
import FileInput from "../components/inputs/FileInput";
import PfpLabel from "../components/PfpLabel";
import Spinner from "../components/loading components/Spinner";
import Alert from "../components/Alert";
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
  const { loanLoading, loanID } = useSelector((state) => state.application);
  const [report, setReport] = useState({});
  const [appReport, setAppReport] = useState({});
  const [sketch, setSketch] = useState({});
  //   const [alert, setAlert] = useState({});
  const submitData = new FormData();

  useEffect(() => {
    dispatch(getLoanId());
  }, []);

  useEffect(() => {
    if (state?.id) dispatch(fetchLoan({ id: state?.id, by: "id" }));
  }, [state?.id, dispatch]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/application/${state?.id}?by=id`)
      .then((response) => response.json())
      .then((data) => {
        setAppReport(data);
        setReport({ ...report, application_id: data.id });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [state?.id]);

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

//   async function handleSubmit(event) {
//     event.preventDefault();
//     document.getElementById("report_spin").style.display = "flex";

//     if (!sketch && !sketch instanceof File) {
//       setAlert({
//         text: "Please upload a sketch image.",
//         icon: "warn",
//       });
//       document.getElementById("ciReport").style.display = "block";
//       document.getElementById("report_spin").style.display = "none";
//       return;
//     }

//     for (let key in report) {
//       submitData.append(`${key}`, report[key]);
//     }
//     submitData.append("sketch", sketch);

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/report", {
//         method: "POST",
//         // headers: {
//         //     'Content-Type': 'application/json',
//         //     'Accept': 'application/json'
//         // },
//         body: submitData,
//         // body: JSON.stringify(applicant)
//       });

//       const result = await response.json();
//       if (!response.ok) throw new Error("Update failed");
//       setAlert({
//         text: `Report for ${appReport.first_name} ${appReport.last_name} has been submitted!`,
//         icon: "done",
//         id: result.record_id,
//         contact: result.contact,
//       });
//       document.getElementById("report_spin").style.display = "none";
//       document.getElementById("ciReport").style.display = "block";
//     } catch (error) {
//       console.error("Error: ", error);
//       setAlert({
//         text: "Failed to submit report",
//         icon: "warn",
//       });
//       document.getElementById("ciReport").style.display = "block";
//       document.getElementById("report_spin").style.display = "none";
//     }
//   }

  function handleChange(event) {
    setReport({
      ...report,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
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

      {/* <div className="overflow-y-auto overflow-x-hidden justify-items-center items-center fixed bg-gray-400 p-4 dark:bg-gray-700 top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="relative p-4 w-full max-w-5xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
                <div className="flex justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    CREDIT INVESTIGATION REPORT
                </h3>
                </div>
                <form onSubmit={handleSubmit}>
                <img
                    src={`http://127.0.0.1:8000/storage/${appReport.id_pic}`}
                    className="rounded rounded-lg w-28"
                    alt="ID"
                />
                <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                    <PfpLabel
                    caption="Applicant Name"
                    label={`${appReport.first_name} ${appReport.last_name}`}
                    />
                    <PfpLabel
                    caption="Date of Birth"
                    label={`${appReport.birth_day}`}
                    />
                    <PfpLabel
                    caption="Place of Birth"
                    label={`${appReport.birth_place}`}
                    />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
                    Father:
                </h3>
                <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2">
                    <PfpLabel
                    caption="First Name"
                    label={`${appReport.father_first}`}
                    />
                    <PfpLabel
                    caption="Middle Name"
                    label={`${appReport.father_middle}`}
                    />
                    <PfpLabel
                    caption="Last Name"
                    label={`${appReport.father_last}`}
                    />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
                    Mother:
                </h3>
                <div className="grid gap-4 mb-4 sm:grid-cols-3 pb-2 border-b dark:border-gray-500">
                    <PfpLabel
                    caption="First Name"
                    label={`${appReport.mother_first}`}
                    />
                    <PfpLabel
                    caption="Middle Name"
                    label={`${appReport.mother_middle}`}
                    />
                    <PfpLabel
                    caption="Last Name"
                    label={`${appReport.mother_last}`}
                    />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
                    Dependents:
                </h3>
                <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                    <table className="w-full">
                    <FormTHead>
                        <FormTH label="Name" />
                        <FormTH label="Relationship" />
                        <FormTH label="Age" />
                        <FormTH label="School" />
                    </FormTHead>
                    <FormTBody>
                        <FormTD placeholder="Full name here" />
                        <FormTD placeholder="Address here" />
                        <FormTD placeholder="Cellphone number" />
                        <FormTD placeholder="School name" />
                    </FormTBody>
                    </table>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
                    Nearest Relatives:
                </h3>
                <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                    <table className="w-full">
                    <FormTHead>
                        <FormTH label="Name" />
                        <FormTH label="Relationship" />
                        <FormTH label="Age" />
                        <FormTH label="School" />
                    </FormTHead>
                    <FormTBody>
                        <FormTD placeholder="Full name here" />
                        <FormTD placeholder="Address here" />
                        <FormTD placeholder="Cellphone number" />
                        <FormTD placeholder="School name" />
                    </FormTBody>
                    </table>
                </div>

                <div className="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
                    <FormTextarea
                    name="comm_standing"
                    id="comm_standing"
                    label="Community Standing"
                    value={appReport.comm_standing}
                    onchange={handleChange}
                    placeholder="Write commuity standing here"
                    require={true}
                    disable={true}
                    />
                    <FormTextarea
                    name="home_description"
                    id="home_description"
                    label="Brief description of place of residence and home"
                    value={appReport.home_description}
                    onchange={handleChange}
                    placeholder="Write residence description here"
                    require={true}
                    disable={true}
                    />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
                    Unit Applied:
                </h3>
                <div className="grid gap-4 mb-4 sm:grid-cols-1 pb-2 border-b dark:border-gray-500">
                    <table className="w-full">
                    <FormTHead>
                        <FormTH label="Model" />
                        <FormTH label="Downpayment" />
                        <FormTH label="Terms Conditions" />
                    </FormTHead>
                    <FormTBody>
                        <FormTD placeholder="Model name" />
                        <FormTD placeholder="Downpayment here" />
                        <FormTD placeholder="Terms & Conditions" />
                    </FormTBody>
                    </table>
                </div>

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
                <div className="grid gap-4 mb-4 sm:grid-cols-2 pb-2 border-b dark:border-gray-500">
                    <FormInput
                    label="First Unit applied"
                    type="text"
                    name="first_unit"
                    id="name"
                    value={report.first_unit}
                    onchange={handleChange}
                    placeholder="Type unit name here"
                    />
                    <img
                    src={`http://127.0.0.1:8000/storage/${appReport.sketch}`}
                    className="rounded rounded-lg w-20" alt="Sketch"
                    />
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
                </form>
            </div>
            <Alert id="ciReport" text={alert.text} icon={alert.icon}>
                <Button text="Ok" onclick={() => navigate("/ci/evaluation")} />
            </Alert>
            </div>
            <Spinner id="report_spin" text="Submitting report..." />
        </div> */}
    </>
  );
}
