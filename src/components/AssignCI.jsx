import React, { useState, useEffect } from "react";
import FormSelect from "./inputs/FormSelect";
import Button from "./buttons/Button";
import CloseBttn from "./buttons/CloseBttn";
import FormTextarea from "./inputs/FormTextarea";
import { useDispatch, useSelector } from "react-redux";
import PopAnimate from "./animations/popAnimate";
import {
  setAlert,
  setLoading,
  toggleModal,
} from "../services/redux/slices/uiSlice";
import { fetchUsers } from "../services/redux/slices/userSlice";
import { UserEntities } from "../services/entities/User";
import { LoanEntity } from "../services/entities/Loan";
import {
  fetchLoan,
  updateStatus,
} from "../services/redux/slices/applicationSlice";
import FormInput from "./inputs/FormInput";

export default function AssignCI() {
  const dispatch = useDispatch();
  const [applicant, setApplicant] = useState({ apply_status: "accepted" });
  const ci = useSelector(UserEntities);
  const loan = useSelector(LoanEntity);
  const { usersLoading } = useSelector((state) => state.user);
  const { modals } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchUsers({ perPage: 50, role: "ci" }));
  }, []);

  function handleChange(event) {
    setApplicant({
      ...applicant,
      [event.target.name]: event.target.value,
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
        dispatch(toggleModal({ name: "addCI", value: modals.addCI }));
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
    modals.addCI && (
      <div className="overflow-y-auto overflow-x-hidden fixed bg-gray-400 dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm top-0 right-0 left-0 z-40 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <PopAnimate>
          <div className="relative p-4 w-[100vh] max-w-3xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-10 sm:py-8 border border-gray-500">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Assign Credit Investigator
                </h3>
                <CloseBttn
                  trigger={() =>
                    dispatch(
                      toggleModal({ name: "addCI", value: modals.addCI })
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
                    name="ci_id"
                    id="ci"
                    label="Credit Investigator"
                    value={applicant.ci_id}
                    onchange={handleChange}
                    require={true}>
                    {!usersLoading &&
                      ci.map((acc, i) => (
                        <option key={i} value={acc.id}>
                          {acc.fullName}
                        </option>
                      ))}
                  </FormSelect>

                  {applicant.ci_id && applicant.ci_id !== "__EMPTY__" && (
                    <div className="flex flex-col gap-y-2 py-3">
                      <span className="text-md font-medium text-gray-900 dark:text-white">
                        Set Meeting schedule:
                      </span>
                      <section className="flex ml-10 gap-x-5">
                        <FormInput
                          label="From"
                          type="date"
                          name="from_sched"
                          min={new Date().toISOString().split("T")[0]}
                          value={applicant.from_sched}
                          onchange={handleChange}
                          require={true}
                        />
                        <FormInput
                          label="To"
                          type="date"
                          name="to_sched"
                          min={applicant.from_sched}
                          value={applicant.to_sched}
                          onchange={handleChange}
                          require={true}
                        />
                      </section>
                    </div>
                  )}

                  <FormTextarea
                    name="message"
                    value={applicant.message}
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
