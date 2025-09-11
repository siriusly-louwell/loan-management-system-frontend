import React from "react";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Button from "../components/buttons/Button";
import Stepper from "../components/Stepper";
import Step from "../components/Step";
import Alert from "../components/Alert";
import Spinner from "../components/loading components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  applyLoan,
  draftForm,
  formCheck,
  getDraft,
  goToStep,
  handleChange,
  resetInput,
  setDisable,
} from "../services/redux/slices/formSlice";
import { setAlert, setLoading } from "../services/redux/slices/uiSlice";

export default function ApplicationForm() {
  const navigate = useNavigate();
  const location = useLocation();
  // const { state } = useLocation();
  const dispatch = useDispatch();
  const { formType, formData, pageComplete, isChecked, stepLevel } =
    useSelector((state) => state.form);
  const [applicant, setApplicant] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [files, setFiles] = useState({});
  const [pageType, setPageType] = useState("next");
  const [modal, setModal] = useState({});
  const [incomplete, setIncomplete] = useState([]);
  const routerPaths = useMemo(
    () => [
      "/customer/apply",
      "/customer/apply/personalinfo",
      "/customer/apply/employinfo",
      "/customer/apply/familyinfo",
      "/customer/apply/requirements",
      "/customer/apply/comakerform",
    ],
    []
  );
  const locations = {
    I: {
      province: ["Ilocos Norte", "Ilocos Sur", "La Union", "Pangasinan"],
      city: [
        "Alaminos",
        "Batac",
        "Candon",
        "Laoag",
        "San Carlos",
        "San Fernando",
        "Urdaneta",
        "Vigan",
        "Dagupan",
      ],
    },
    II: {
      province: ["Batanes", "Cagayan", "Isabela", "Nueva Viscaya", "Quirino"],
      city: ["Cauayan", "Iligan", "Santiago", "Tuguegarao"],
    },
    III: {
      province: [
        "Aurora",
        "Bataan",
        "Bulacan",
        "Nueva Ecija",
        "Pampanga",
        "Tarlac",
        "Zambales",
      ],
      city: [
        "Angeles",
        "Balanga",
        "Cabanatuan",
        "Gapan",
        "Malolos",
        "Meycauayan",
        "Munoz",
        "Olongapo",
        "Palayan",
        "San Fernando",
        "San Jose",
        "Tarlac",
      ],
    },
    IV: {
      province: [
        "Batangas",
        "Cavite",
        "Laguna",
        "Quezon",
        "Rizal",
        "Marinduque",
        "Occidental Mindoro",
        "Oriental Mindoro",
        "Palawan",
        "Romblon",
      ],
      city: [
        "Antipolo",
        "Bacoor",
        "Batangas City",
        "Binan",
        "Cabuyao",
        "Calamba",
        "Calauan",
        "Dasmarinas",
        "General Trias",
        "Imus",
        "Lipa",
        "Lucena",
        "San Pablo",
      ],
    },
    V: {
      province: [
        "Albay",
        "Camarines Norte",
        "Camarines Sur",
        "Catanduanes",
        "Masbate",
        "Sorsogon",
      ],
      city: [
        "Iraga",
        "Legazpi",
        "Ligao",
        "Masbate",
        "Naga",
        "Sorsogon City",
        "Tabaco",
      ],
    },
    VI: {
      province: [
        "Aklan",
        "Antique",
        "Capiz",
        "Guimaras",
        "Iloilo",
        "Negros Occidental",
      ],
      city: [
        "Bacolod",
        "Bago",
        "Cadiz",
        "Escalante",
        "Himamaylan",
        "Kabankalan",
        "Kalibo",
        "La Carlota",
        "Passi",
        "Roxas",
        "Sagay",
        "San Carlos",
        "Silay",
        "Talisay",
      ],
    },
    VII: {
      province: ["Bohol", "Cebu", "Negros Oriental", "Siquijor"],
      city: [
        "Bogo",
        "Carcar",
        "Cebu",
        "Danao",
        "Dumaguete",
        "Lapu-Lapu",
        "Mandaue",
        "Naga",
        "Tagbilaran",
        "Talisay",
        "Toledo",
      ],
    },
    VIII: {
      province: [
        "Biliran",
        "Eastern Samar",
        "Leyte",
        "Northern Samar",
        "Samar",
        "Southern Leyte",
      ],
      city: [
        "Baybay",
        "Borongan",
        "Calibayag",
        "Catbalogan",
        "Ormoc",
        "Tacloban",
      ],
    },
    IX: {
      province: [
        "Zamboanga del Norte",
        "Zamboanga del Sur",
        "Zambuanga Sibugay",
      ],
      city: ["Dapitan", "Dipolog", "Pagadian", "Zamboanga City"],
    },
    X: {
      province: [
        "Bukidnon",
        "Camiguin",
        "Lanao del Norte",
        "Misamis Occidental",
        "Misamis Oriental",
      ],
      city: [
        "Cagayan de Oro",
        "El Salvador",
        "Gingoog",
        "Iligan",
        "Malaybalay",
        "Oroquieta",
        "Ozamiz",
        "Tangub",
        "Valencia",
      ],
    },
    XI: {
      province: [
        "Davao de Oro",
        "Davao del Norte",
        "Davao del Sur",
        "Davao Occidental",
        "Davao Oriental",
      ],
      city: ["Davao City", "Digos", "Mati", "Panabo", "Samal", "Tagum"],
    },
    XII: {
      province: ["Cotabato", "Sarangani", "South Cotabato", "Sultan Kudarat"],
      city: ["General Santos", "Kidapawan", "Koronadal", "Tacurong"],
    },
    XIII: {
      province: [
        "Agusan del Norte",
        "Agusan del Sur",
        "Dinagat Islands",
        "Surigao del Norte",
        "Maguindanao del Sur",
      ],
      city: ["Bayugan", "Bislig", "Butuan", "Cabadbaran", "Surigao", "Tandag"],
    },
    XIV: {
      province: [
        "Basilan",
        "Lanao del Sur",
        "Maguindanao del Norte",
        "Maguindanao del Sur",
        "Sulu",
        "Tawi-Tawi",
      ],
      city: ["Cotabato City", "Lamitan", "Marawi"],
    },
    XV: {
      province: [
        "Abra",
        "Apayao",
        "Benguet",
        "Ifugao",
        "Kalinga",
        "Mountain Province",
      ],
      city: ["Baguio", "Tabuk"],
    },
  };

  useEffect(() => {
    const index = routerPaths.indexOf(location.pathname);
    if (index >= 0 && index !== currentIndex) setCurrentIndex(index);
    window.scrollTo(0, 0);
  }, [location, routerPaths, currentIndex]);

  useEffect(() => {
    if (pageType === "next") {
      if (pageComplete) {
        const nextIndex = currentIndex + 1;
        if (nextIndex < routerPaths.length) navigate(routerPaths[nextIndex]);
      }
    } else if (pageType === "step") {
      if (pageComplete) {
        navigate(routerPaths[stepLevel]);
      }
    }

    if (!pageComplete && pageComplete !== null)
      dispatch(
        setAlert({ message: "Some fields are required!", type: "warn" })
      );
  }, [isChecked, pageComplete, pageType, navigate, dispatch]);

  function handleNext() {
    setPageType("next");
    dispatch(formCheck(currentIndex));
  }

  function handlePrev() {
    setPageType("prev");
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) navigate(routerPaths[prevIndex]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(
      setLoading({
        isActive: true,
        text: "Submitting application. Please wait...",
      })
    );

    try {
      const response = await dispatch(applyLoan({ formData, files })).unwrap();

      dispatch(setLoading({ isActive: false }));
      dispatch(setAlert({ message: response.message, type: response.type }));
      dispatch(resetInput());
      setFiles([]);
      setModal({
        text: `Your application has been submitted!`,
        icon: "done",
        id: response.record_id,
        contact: response.contact,
      });
      document.getElementById("application_submit").style.display = "block";
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

  function fileChange(event) {
    setFiles({
      ...files,
      [event.target.name]: event.target.files[0],
    });
  }

  function dispatchInput(event, type = formType) {
    dispatch(
      handleChange({
        name: event.target.name,
        value: event.target.value,
        formType: type,
      })
    );
  }

  function stepCheck(index) {
    if (incomplete.includes(index)) return "incomplete";
    else
      return currentIndex === index
        ? "current"
        : currentIndex > index
        ? "done"
        : "pend";
  }

  useEffect(() => {
    dispatch(setDisable(false));
    if (location.pathname !== "/customer/apply") dispatch(getDraft());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(draftForm());
    }, 3000);
  }, [formData, dispatch]);

  function stepNavCheck(index) {
    setPageType("step");
    dispatch(goToStep(index));
    dispatch(formCheck(currentIndex));
  }

  // const ids = state?.selected;
  // const selectColor = state?.selectColor;
  const disable = false;
  const outletContext = {
    applicant,
    handleChange,
    dispatchInput,
    fileChange,
    disable,
    locations,
    // ids,
    // selectColor,
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden sm:flex flex-start bg-gray-300 p-4 dark:bg-gray-700 top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] md:min-h-screen">
      <Stepper>
        <Step
          label="1. Loan Setup"
          status={stepCheck(0)}
          click={() => navigate(routerPaths[0])}
        />
        <Step
          label="2. Personal Information"
          status={stepCheck(1)}
          // click={() => dispatch(goToStep(1))}
          click={() => stepNavCheck(1)}
        />
        <Step
          label="4. Employment, Properties, & Income/Expenses"
          status={stepCheck(2)}
          click={() => stepNavCheck(2)}
        />
        <Step
          label="3. Family/Relative Information"
          status={stepCheck(3)}
          click={() => stepNavCheck(3)}
        />
        <Step
          label="5. Upload Requirements"
          status={stepCheck(4)}
          click={() => stepNavCheck(4)}
        />
        <Step
          label="6. Comaker Form"
          status={stepCheck(5)}
          click={() => stepNavCheck(5)}
        />
      </Stepper>
      <div className="relative p-4 w-full max-w-5xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
          <div className="flex justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {location.pathname === "/customer/apply/comakerform"
                ? "COMAKER FORM"
                : "APPLICATION FORM"}
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <Outlet context={outletContext} />

            <div className="space-y-4 sm:flex sm:w-1/3 sm:space-y-0 sm:space-x-4">
              {currentIndex > 0 && (
                <Button text="Back" bttnType="button" onclick={handlePrev} />
              )}
              {currentIndex < routerPaths.length - 1 ? (
                <Button text="Next" bttnType="button" onclick={handleNext} />
              ) : (
                <Button text="Done" bttnType="submit" />
              )}
            </div>
          </form>
          <Spinner
            id="saving_application"
            text="Submitting application. Please wait..."
          />
          <Alert id="emptyInput" text={alert.text} icon="warn">
            <Button
              text="Understood"
              onclick={() =>
                (document.getElementById("emptyInput").style.display = "none")
              }
            />
          </Alert>
          <Alert id="application_submit" text={modal.text} icon={modal.icon}>
            <h2 className="text-gray-600 dark:text-white">
              Your Record ID:{" "}
              <strong className="text-rose-500">{modal.id}</strong>
            </h2>
            <p className="text-rose-500 mb-2">
              Please save or take a photo of your record ID.
            </p>
            <p className="text-gray-600 dark:text-white mb-5">
              Your application is under review, we will notify you once it is
              done. A notification will be sent to you via SMS on{" "}
              <strong className="text-rose-500">{modal.contact}</strong>. Please
              check for more detailed information.
            </p>
            <Button
              text="Finish"
              type="button"
              onclick={() => {
                document.getElementById("application_submit").style.display =
                  "none";
                navigate("/");
              }}
            />
          </Alert>
        </div>
      </div>
    </div>
  );
}
