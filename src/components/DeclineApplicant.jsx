import React, { useState } from "react";
import FormSelect from "./inputs/FormSelect";
import Button from "./buttons/Button";
import CloseBttn from "./buttons/CloseBttn";
import FormTextarea from "./inputs/FormTextarea";
import FormCheck from "./checkboxes/FormCheck";
import { useDispatch, useSelector } from "react-redux";
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
import PopAnimate from "./animations/popAnimate";

export default function DeclineApplicant() {
  const dispatch = useDispatch();
  const loan = useSelector(LoanEntity);
  const { modals } = useSelector((state) => state.ui);
  const [decline, setDecline] = useState({ apply_status: "denied" });

  function handleChange(event) {
    setDecline({
      ...decline,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(setLoading({ isActive: true, text: "Saving data..." }));

    try {
      const response = await dispatch(
        updateStatus({ ...decline, id: loan.id })
      ).unwrap();

      dispatch(setLoading({ isActive: false }));
      dispatch(setAlert({ message: response.message, type: response.type }));

      if (response.type === "success") {
        dispatch(toggleModal({ name: "declineApp", value: modals.declineApp }));
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
    modals.declineApp && (
      <div className="overflow-y-auto overflow-x-hidden fixed bg-gray-400 dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm top-0 right-0 left-0 z-40 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <PopAnimate>
          <div className="relative p-4 w-[100vh] max-w-3xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-10 sm:py-8 border border-gray-500">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Declination of Application
                </h3>
                <CloseBttn
                  trigger={() =>
                    dispatch(
                      toggleModal({
                        name: "declineApp",
                        value: modals.declineApp,
                      })
                    )
                  }
                />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-5 space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 pb-3 dark:text-white">
                    {loan.record_id} - {loan.fullName}
                  </h3>
                  <FormSelect
                    name="type"
                    id="ci"
                    label="Reason for Declination"
                    value={decline.type}
                    onchange={handleChange}>
                    <option value="incorrect_info">
                      Incorrect inputted values
                    </option>
                    <option value="incorrect_file">
                      Wrong requirements uploaded
                    </option>
                    <option value="unmet">Unmet standards</option>
                  </FormSelect>
                  {decline.type !== "unmet" && decline.type && (
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Allow Resubmit?
                      </label>
                      <div className="space-y-4 sm:flex sm:space-y-0">
                        <FormCheck
                          type="radio"
                          id="inline-check"
                          label="Yes"
                          value="yes"
                          name="resubmit"
                          change={handleChange}
                        />
                        <FormCheck
                          type="radio"
                          id="inline-2-check"
                          label="No"
                          value="no"
                          name="resubmit"
                          change={handleChange}
                        />
                      </div>
                    </div>
                  )}
                  <FormTextarea
                    name="message"
                    value={decline.message}
                    onchange={handleChange}
                    label="Add a message to the applicant (optional):"
                    placeholder="Write your message here..."
                  />
                </div>
                <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                  <Button text="Finish Assignment" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </PopAnimate>
      </div>
    )
  );
}
