import React from "react";
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Button from "../components/buttons/Button";
import Stepper from "../components/Stepper";
import Step from "../components/Step";
import { useDispatch, useSelector } from "react-redux";
import {
  applyLoan,
  draftForm,
  formCheck,
  getDraft,
  handleChange,
  resetInput,
  setDisable,
} from "../services/redux/slices/formSlice";
import {
  nextPage,
  prevPage,
  setAlert,
  setLoading,
  goToStep,
  setStep,
  toggleModal,
  resetState,
} from "../services/redux/slices/uiSlice";
import Dialog from "../components/modals/Dialog";
import Check from "../assets/icons/Check";
import SaveButton from "../components/buttons/SaveButton";
import { UserEntity } from "../services/entities/User";
import { fetchAddress } from "../services/redux/slices/addressSlice";

export default function ApplicationForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { formType, formData, pageComplete, isChecked } = useSelector(
    (state) => state.form
  );
  const { toggled, pageRoute, pageNum, stepIndex, modals } = useSelector(
    (state) => state.ui
  );
  const { regions } = useSelector((state) => state.address);
  const user = useSelector(UserEntity);
  const [files, setFiles] = useState({});
  const [pageType, setPageType] = useState("next");
  const [modal, setModal] = useState({});

  useEffect(() => {
    if (pageType === "next" && pageComplete) dispatch(nextPage());
    if (pageType === "step" && pageComplete) dispatch(goToStep(stepIndex));
    if (pageType === "prev") navigate(pageRoute);

    if (!pageComplete && pageComplete !== null)
      dispatch(
        setAlert({ message: "Some fields are required!", type: "warn" })
      );

    window.scrollTo(0, 0);
  }, [isChecked, stepIndex, toggled, pageComplete, pageType, dispatch]);

  useEffect(() => {
    if (pageType === "next" || pageType === "step") navigate(pageRoute);
  }, [pageRoute]);

  useEffect(() => {
    if (regions.length === 0) dispatch(fetchAddress({ type: "regions" }));
  }, []);

  useEffect(() => {
    dispatch(
      fetchAddress({ type: "provinces", value: formData.address.region })
    );
    dispatch(
      fetchAddress({ type: "cities", value: formData.address.province })
    );
    dispatch(fetchAddress({ type: "barangays", value: formData.address.city }));
  }, [
    formData.address.region,
    formData.address.province,
    formData.address.city,
  ]);

  useEffect(() => {
    dispatch(
      fetchAddress({ type: "provinces", value: formData.address.p_region })
    );
    dispatch(
      fetchAddress({ type: "cities", value: formData.address.p_province })
    );
    dispatch(
      fetchAddress({ type: "barangays", value: formData.address.p_city })
    );
  }, [
    formData.address.p_region,
    formData.address.p_province,
    formData.address.p_city,
  ]);

  useEffect(() => {
    dispatch(
      fetchAddress({ type: "provinces", value: formData.address.sp_region })
    );
    dispatch(
      fetchAddress({ type: "cities", value: formData.address.sp_province })
    );
    dispatch(
      fetchAddress({ type: "barangays", value: formData.address.sp_city })
    );
  }, [
    formData.address.sp_region,
    formData.address.sp_province,
    formData.address.sp_city,
  ]);

  function handleNext() {
    setPageType("next");
    dispatch(formCheck(pageNum));
  }

  function handlePrev() {
    setPageType("prev");
    dispatch(prevPage());
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
      dispatch(resetState());
      setFiles([]);
      setModal({
        text: `Your application has been submitted!`,
        icon: "done",
        id: response.record_id,
        contact: response.contact,
      });
      dispatch(
        toggleModal({
          name: "application",
          value: modals?.application,
        })
      );
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
    // if (incomplete.includes(index)) return "incomplete";
    // else
    return pageNum === index ? "current" : pageNum > index ? "done" : "pend";
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
    dispatch(setStep(index));
    dispatch(formCheck(pageNum));
  }

  const outletContext = {
    handleChange,
    dispatchInput,
    fileChange,
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden sm:flex flex-start bg-gray-300 p-4 dark:bg-gray-700 top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] md:min-h-screen">
      <Stepper>
        <Step
          label="1. Loan Setup"
          status={stepCheck(0)}
          click={() => stepNavCheck(0)}
        />
        <Step
          label="2. Personal Information"
          status={stepCheck(1)}
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
          <div className="flex justify-between pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {location.pathname === "/customer/apply/comakerform"
                ? "COMAKER FORM"
                : "APPLICATION FORM"}
            </h3>
            <SaveButton trigger={() => dispatch(draftForm())} />
          </div>
          <form onSubmit={handleSubmit}>
            <Outlet context={outletContext} />

            <div className="space-y-4 sm:flex sm:w-1/3 sm:space-y-0 sm:space-x-4">
              {pageNum > 0 && (
                <Button text="Back" bttnType="button" onclick={handlePrev} />
              )}
              {location.pathname === "/customer/apply/comakerform" ? (
                <Button text="Done" bttnType="submit" />
              ) : (
                <Button text="Next" bttnType="button" onclick={handleNext} />
              )}
            </div>
          </form>
          <Dialog
            text={modal.text}
            modalName="application"
            icon={
              <div className="mx-auto mb-4 w-14 h-14 border border-green-500 border-4 p-3 rounded-full">
                <Check color="green" size={7} />
              </div>
            }>
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
                user?.role === "staff"
                  ? navigate("/staff/units")
                  : navigate("/");

                dispatch(
                  toggleModal({
                    name: "application",
                    value: modals?.application,
                  })
                );
              }}
            />
          </Dialog>
          {/* {modals.application ? (
          ) : (
            ""
          )} */}
        </div>
      </div>
    </div>
  );
}
