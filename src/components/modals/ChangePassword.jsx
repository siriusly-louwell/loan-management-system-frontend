import React, { useEffect, useState } from "react";
import CloseBttn from "./../buttons/CloseBttn";
import PopAnimate from "./../animations/popAnimate";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "./../inputs/FormInput";
import Button from "./../buttons/Button";
import { ArrowRight, KeyRound } from "lucide-react";
import CustomBttn from "../buttons/CustomBttn";
import { UserEntity } from "../../services/entities/User";
import {
  changePassword,
  validatePass,
} from "../../services/redux/slices/authSlice";
import {
  setAlert,
  setLoading,
  toggleModal,
} from "../../services/redux/slices/uiSlice";
import PasswordRequirements from "../texts/PasswordRequirements";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const { id } = useSelector(UserEntity);
  const { validation } = useSelector((state) => state.auth);
  const { modals } = useSelector((state) => state.ui);
  const [newPass, setNewPass] = useState({
    current_password: "",
    new_password: "",
  });

  useEffect(() => {
    dispatch(
      validatePass({
        new: newPass.new_password,
        confirm: newPass.new_password_confirmation,
      })
    );
  }, [newPass.new_password, newPass.new_password_confirmation]);

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(setLoading({ isActive: true, text: "Updating your password..." }));

    try {
      const response = await dispatch(
        changePassword({ ...newPass, user: id })
      ).unwrap();

      dispatch(setLoading({ isActive: false }));
      dispatch(setAlert({ message: response.message, type: response.type }));
      if (response.type === "success") {
        setNewPass({});
        dispatch(
          toggleModal({ name: "changePass", value: modals?.changePass })
        );
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

  const handleChange = (e, prop) =>
    setNewPass({ ...newPass, [prop]: e.target.value });

  return (
    <PopAnimate
      modalName={modals.changePass}
      classStyle="relative p-4 w-full max-w-xl h-full md:h-auto">
      <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-500">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Change Password
          </h3>
          <CloseBttn
            trigger={() =>
              dispatch(
                toggleModal({ name: "changePass", value: modals?.changePass })
              )
            }
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4">
            <section className="justify-items-center my-5 space-y-3">
              <div className="text-rose-500 bg-gray-300 justify-items-center border border-rose-400 rounded-full py-5 px-6">
                <KeyRound size={70} />
                <span className="font-bold text-3xl">••••••••</span>
              </div>
              <h1 className="text-2xl font-light text-gray-900 dark:text-white">
                Change your password for better security
              </h1>
            </section>
            <FormInput
              label="Current Password"
              type="text"
              value={newPass.current_password}
              onchange={(e) => handleChange(e, "current_password")}
              name="current_password"
              id="password"
              placeholder="Enter your current password"
              require={true}
            />
            <FormInput
              label="New Password"
              type="text"
              name="new_password"
              id="new-pass"
              value={newPass.new_password}
              onchange={(e) => handleChange(e, "new_password")}
              placeholder="Enter your new password"
              require={true}
            />
            <div
              className={`transition-all duration-300 ${
                newPass.new_password !== ""
                  ? "opacity-100 mb-10"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}>
              <PasswordRequirements
                rules={[
                  {
                    label: "At least 8 characters long",
                    isValid: validation.length,
                  },
                  {
                    label: "Contains an uppercase letter",
                    isValid: validation.uppercase,
                  },
                  {
                    label: "Contains a lowercase letter",
                    isValid: validation.lowercase,
                  },
                  { label: "Includes a number", isValid: validation.number },
                  { label: "Password confirmed", isValid: validation.match },
                ]}
              />
            </div>
            <FormInput
              label="Confirm Password"
              type="text"
              name="new_password_confirmation"
              id="confirm-pass"
              value={newPass.new_password_confirmation}
              onchange={(e) => handleChange(e, "new_password_confirmation")}
              placeholder="••••••••"
              require={true}
            />
          </div>
          <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <Button text="Save Password" type="submit" />
            <CustomBttn
              classname="flex items-center whitespace-nowrap bg-white text-rose-700 hover:text-white border hover:bg-rose-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center dark:text-rose-500 dark:hover:text-white dark:hover:bg-rose-600 dark:focus:ring-rose-900"
              text="Not now"
              onclick={() =>
                dispatch(
                  toggleModal({ name: "changePass", value: modals?.changePass })
                )
              }>
              <ArrowRight size={20} />
            </CustomBttn>
          </div>
        </form>
      </div>
    </PopAnimate>
  );
}
