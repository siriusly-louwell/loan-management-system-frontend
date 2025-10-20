import React, { useEffect, useState } from "react";
import Button from "./buttons/Button";
import CloseBttn from "./buttons/CloseBttn";
import { useDispatch, useSelector } from "react-redux";
import PopAnimate from "./animations/popAnimate";
import {
  setAlert,
  setLoading,
  toggleModal,
} from "../services/redux/slices/uiSlice";
import { LoanEntity } from "../services/entities/Loan";
import {
  fetchLoan,
  updateStatus,
} from "../services/redux/slices/applicationSlice";
import FormInput from "./inputs/FormInput";

export default function ApproveLoan() {
  const dispatch = useDispatch();
  const [applicant, setApplicant] = useState({ apply_status: "approved" });
  const loan = useSelector(LoanEntity);
  const { modals } = useSelector((state) => state.ui);

  useEffect(() => {
    if (modals.approveLoan)
      setApplicant({
        ...applicant,
        emi: loan.emi,
        tenure: loan.transactions[0]?.tenure,
      });
  }, [modals.approveLoan]);

  function handleChange(event) {
    setApplicant({
      ...applicant,
      due_date: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(setLoading({ isActive: true, text: "Saving data..." }));

    try {
      const response = await dispatch(
        updateStatus({ ...applicant, id: loan.id })
      ).unwrap();

      dispatch(setLoading({ isActive: false }));
      dispatch(setAlert({ message: response.message, type: response.type }));

      if (response.noCI) setApplicant({ ...applicant, ci_id: "__EMPTY__" });
      if (response.type === "success") {
        dispatch(
          toggleModal({ name: "approveLoan", value: modals.approveLoan })
        );
        dispatch(fetchLoan({ id: loan.id, by: "id" }));
      }
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

  return (
    <PopAnimate
      modalName={modals.approveLoan}
      classStyle="relative p-4 w-[100vh] max-w-lg h-full md:h-auto">
      <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-10 sm:py-8 border border-gray-500">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Set Payment monthly schedule
          </h3>
          <CloseBttn
            trigger={() =>
              dispatch(
                toggleModal({ name: "approveLoan", value: modals.approveLoan })
              )
            }
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-5 space-y-3">
            <FormInput
              label="Payment Due date"
              type="date"
              name="due_date"
              min={new Date().toISOString().split("T")[0]}
              value={applicant.due_date}
              onchange={handleChange}
              require={true}
            />
          </div>
          <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <Button text="Finish Assignment" type="submit" />
          </div>
        </form>
      </div>
    </PopAnimate>
  );
}
