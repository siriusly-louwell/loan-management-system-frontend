import React, { useEffect, useState } from "react";
import FormInput from "../components/inputs/FormInput";
import FormSelect from "../components/inputs/FormSelect";
import Button from "../components/buttons/Button";
import CloseBttn from "../components/buttons/CloseBttn";
import Spinner from "../components/loading components/Spinner";
import FileInput from "../components/inputs/FileInput";
import Alert from "../components/Alert";
import PopAnimate from "../components/animations/popAnimate";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlert,
  setLoading,
  toggleModal,
} from "../services/redux/slices/uiSlice";
import {
  handleChange,
  initialForm,
  resetInput,
  setType,
} from "../services/redux/slices/formSlice";
import { addUser, fetchUsers } from "../services/redux/slices/userSlice";

export default function CreateUser({ userType }) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);
  const { formData } = useSelector((state) => state.form);
  const [pfp, setPfp] = useState({});

  useEffect(() => {
    dispatch(setType("createUser"));
    dispatch(
      initialForm({ role: userType, password: "password", status: "active" })
    );
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(setLoading({ isActive: true, text: "Saving data..." }));

    try {
      const form = formData.createUser;
      const response = await dispatch(addUser({ form, pfp })).unwrap();

      dispatch(setLoading({ isActive: false }));
      dispatch(setAlert({ message: response.message, type: response.type }));
      if (response.type === "success") {
        dispatch(resetInput());
        setPfp({});
        dispatch(fetchUsers({ page: 1, role: userType }));
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

  // function pfpChange(event) {
  //   setPfp(event.target.files[0]);
  // }

  function dispatchInput(event) {
    dispatch(
      handleChange({
        name: event.target.name,
        value: event.target.value,
        formType: "createUser",
      })
    );
  }

  return (
    modals.createUser && (
      <div className="flex items-center justify-center fixed bg-gray-400 dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-40 top-0 right-0 left-0 z-40 justify-items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <PopAnimate>
          <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add User
                </h3>
                <CloseBttn
                  trigger={() =>
                    dispatch(
                      toggleModal({
                        name: "createUser",
                        value: modals?.createUser,
                      })
                    )
                  }
                />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-3">
                  <FormInput
                    label="First name"
                    type="text"
                    value={formData.createUser.first_name || ""}
                    onchange={dispatchInput}
                    name="first_name"
                    id="name"
                    placeholder="Type first name"
                    require={true}
                  />
                  <FormInput
                    label="Middle name"
                    type="text"
                    name="middle_name"
                    id="mname"
                    value={formData.createUser.middle_name || ""}
                    onchange={dispatchInput}
                    placeholder="Type middle name"
                  />
                  <FormInput
                    label="Last name"
                    type="text"
                    name="last_name"
                    id="lname"
                    value={formData.createUser.last_name || ""}
                    onchange={dispatchInput}
                    placeholder="Type last name"
                    require={true}
                  />
                  <FormInput
                    label="Email Address"
                    type="text"
                    name="email"
                    id="email"
                    value={formData.createUser.email || ""}
                    onchange={dispatchInput}
                    placeholder="john@gmail.com"
                    require={true}
                  />
                  <FormInput
                    label="Contact number"
                    type="number"
                    name="contact"
                    id="number"
                    value={formData.createUser.contact || ""}
                    onchange={dispatchInput}
                    placeholder="Phone number here"
                  />
                  <FormSelect
                    name="gender"
                    id="gender"
                    label="Gender"
                    value={formData.createUser.gender || ""}
                    onchange={dispatchInput}
                    require={true}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </FormSelect>
                </div>
                {/* <FileInput
                  label="Upload Profile picture:"
                  type="img"
                  name="pfp"
                  change={pfpChange}
                  require={true}
                /> */}
                <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                  <Button text="Add user" type="submit" />
                </div>
              </form>
              <Spinner id="saving_data" text="Saving data..." />
              <Alert id="alertUser" text={alert.text} icon={alert.icon}>
                {alert.icon !== "warn" ? (
                  <>
                    <h2 className="text-gray-600 dark:text-white">
                      {alert.name} has been notified through email.
                    </h2>
                    <p className="text-gray-600 dark:text-white mb-5">
                      The user's credentials along with the temporary password
                      will be sent through{" "}
                      <strong className="text-rose-500">{alert.email}</strong>.
                    </p>
                  </>
                ) : (
                  ""
                )}
                <Button
                  text="Ok"
                  onclick={() =>
                    (document.getElementById("alertUser").style.display =
                      "none")
                  }
                />
              </Alert>
            </div>
          </div>
        </PopAnimate>
      </div>
    )
  );
}
