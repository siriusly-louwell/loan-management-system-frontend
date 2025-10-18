import React, { useState, useEffect } from "react";
import CustomBttn from "../components/buttons/CustomBttn";
import BasicBttn from "../components/buttons/BasicBttn";
import AssignCI from "../components/AssignCI";
import DeclineApplicant from "../components/DeclineApplicant";
import Eligibility from "../components/modals/Eligibility";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoan,
  getLoanId,
  updateStatus,
} from "../services/redux/slices/applicationSlice";
import {
  setAlert,
  setLoading,
  toggleModal,
} from "../services/redux/slices/uiSlice";
import { LoanEntity } from "../services/entities/Loan";
import { fetchUnits } from "../services/redux/slices/unitSlice";
import Dialog from "../components/modals/Dialog";
import UnitRecommendation from "../components/UnitRecommendation";
import LoanDetails from "../components/LoanDetails";
import TextDialog from "../components/modals/TextDialog";

export default function LoanInfo() {
  const dispatch = useDispatch();
  const [approval, setApproval] = useState();
  const loan = useSelector(LoanEntity);
  const { modals } = useSelector((state) => state.ui);
  const { loanID } = useSelector((state) => state.application);

  useEffect(() => {
    dispatch(getLoanId());
  }, []);

  useEffect(() => {
    if (loanID) dispatch(fetchLoan({ id: loanID, by: "id" }));
  }, [loanID, dispatch]);

  useEffect(() => {
    if (loan.ndi && (loan.status === "denied" || loan.status === "declined"))
      dispatch(fetchUnits({ ndi: loan.ndi }));
  }, [loan.ndi, loan.status, dispatch]);

  async function approveApplicant(event) {
    event.preventDefault();
    dispatch(setLoading({ isActive: true, text: "Saving data..." }));
    dispatch(toggleModal({ name: "approvalApp", value: modals.approvalApp }));

    try {
      const response = await dispatch(
        updateStatus({ apply_status: approval.text, id: loan.id })
      ).unwrap();

      dispatch(setLoading({ isActive: false }));
      dispatch(setAlert({ message: response.message, type: response.type }));
      if (response.type === "success")
        dispatch(fetchLoan({ id: loan.id, by: "id" }));
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

  async function cancelApplication(event) {
    event.preventDefault();
    dispatch(setLoading({ isActive: true, text: "Saving data..." }));
    dispatch(toggleModal({ name: "cancelApp", value: modals.cancelApp }));

    try {
      const response = await dispatch(
        updateStatus({ apply_status: approval.text, id: loan.id })
      ).unwrap();

      dispatch(setLoading({ isActive: false }));
      dispatch(setAlert({ message: response.message, type: response.type }));
      if (response.type === "success")
        dispatch(fetchLoan({ id: loan.id, by: "id" }));
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

  function staffAction(string) {
    dispatch(toggleModal({ name: "eligibility", value: modals.eligibility }));
    dispatch(
      toggleModal({ name: "decideAppModal", value: modals.decideAppModal })
    );
    dispatch(toggleModal({ name: string, value: modals[string] }));
  }

  return (
    <section className="bg-gray-200 py-8 antialiased dark:bg-gray-900 md:py-16">
      <LoanDetails setApproval={setApproval} />
      {(loan.status === "declined" || loan.status === "denied") && (
        <UnitRecommendation />
      )}
      <TextDialog title="Reason for Rejection:" content={loan.reject_reason} />
      <Eligibility />
      <DeclineApplicant />
      <AssignCI />

      <Dialog text={approval?.label} modalName="approvalApp">
        <section className="flex space-x-4 items-center justify-center">
          <CustomBttn
            text="Yes"
            onclick={approveApplicant}
            classname="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          />
          <BasicBttn
            text="No, cancel"
            click={() =>
              dispatch(
                toggleModal({ name: "approvalApp", value: modals.approvalApp })
              )
            }
          />
        </section>
      </Dialog>
      <Dialog text="Choose Decision" modalName="decideAppModal">
        <section className="flex space-x-4 items-center justify-center">
          <CustomBttn
            text="Accept Application"
            onclick={() => staffAction("addCI")}
            classname="flex items-center w-full whitespace-nowrap justify-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:border-blue-500 dark:text-blue-200 dark:hover:text-white dark:hover:bg-blue-800 dark:focus:ring-blue-900"
          />
          <CustomBttn
            text="Deny Application"
            onclick={() => staffAction("declineApp")}
            classname="flex items-center w-full justify-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-red-600 dark:border-red-500 dark:text-red-200 dark:hover:text-white dark:hover:bg-red-800 dark:focus:ring-red-900"
          />
        </section>
      </Dialog>
    </section>
  );
}
