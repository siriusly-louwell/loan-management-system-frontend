import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/buttons/Button";
import TextInput from "../components/inputs/TextInput";
import RMCI from "../assets/images/RMCI.png";
import PfpLabel from "../components/PfpLabel";
import Image from "../assets/icons/Image";
import CustomBadge from "../components/badges/CustomBadge";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoan,
  setLoanLoad,
} from "../services/redux/slices/applicationSlice";
import { ApplicationEntity } from "../services/entities/Application";
import { registerUser } from "../services/redux/slices/userSlice";
import { setAlert, setLoading } from "../services/redux/slices/uiSlice";
import { loginUser } from "../services/redux/slices/authSlice";

export default function Register({ setUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const application = useSelector(ApplicationEntity);
  const { loanLoading } = useSelector((state) => state.application);
  const [record, setRecord] = useState("");
  const [register, setRegister] = useState({
    role: "customer",
    status: "active",
  });
  const emptyState = record !== "" && application.id === undefined;

  useEffect(() => {
    dispatch(setLoanLoad(false));
  }, []);

  useEffect(() => {
    if (record) dispatch(fetchLoan({ id: record, by: "record_id" }));
  }, [record, dispatch]);

  useEffect(() => {
    setRegister({
      ...register,
      apply_status: application.apply_status,
      contact: application.contact_num,
      gender: application.gender,
      first_name: application.first_name,
      last_name: application.last_name,
      email: application.email,
      user_id: application.user_id || false,
      record_id: application.record_id,
    });
  }, [application]);

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(setLoading({ isActive: true, text: "Saving data..." }));

    try {
      const response = await dispatch(registerUser(register)).unwrap();
      dispatch(setAlert({ message: response.message, type: response.type }));

      if (response.type === "success") {
        await dispatch(
          loginUser({ email: application.email, password: register.password })
        ).unwrap();
        setTimeout(() => {
          dispatch(setLoading({ isActive: false }));
          navigate("/customer");
        }, 2000);
      } else dispatch(setLoading({ isActive: false }));
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
    setRegister({
      ...register,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
      <section className="bg-gray-200 h-screen dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold space-x-4 text-gray-900 dark:text-white">
            <img src={RMCI} className="h-8 mr-2" alt="Rhean Motor Logo" />
            Rhean Motor Center
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <TextInput
                  name="record_id"
                  type="text"
                  id="id"
                  value={record}
                  change={(e) => setRecord(e.target.value)}
                  caption="Input your record ID/application ID"
                  placeholder="2025-FG343D"
                  required={true}
                />
                <div className={`flex h-16 space-x-5`}>
                  {loanLoading ? (
                    <div className="flex items-center space-x-3 animate-pulse">
                      <div className="h-16 w-16 flex justify-center items-center rounded-lg bg-gray-300 dark:bg-gray-700">
                        <Image size={8} />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <div className="h-4 w-28 rounded bg-gray-300 dark:bg-gray-700" />
                        <div className="h-3 w-44 rounded bg-gray-300 dark:bg-gray-700" />
                        <div className="h-6 w-20 rounded bg-gray-300 dark:bg-gray-700" />
                      </div>
                    </div>
                  ) : record === "" ? (
                    <>
                      <div className="h-16 w-16 rounded-lg flex justify-center items-center bg-gray-200 dark:bg-gray-600">
                        <Image size={8} />
                      </div>
                      <PfpLabel caption="Name" label="- - -" />
                    </>
                  ) : emptyState ? (
                    <div className="flex w-full items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-600">
                      <p className="text-gray-400 dark:text-gray-700 text-lg font-small">
                        Record doesn't exist
                      </p>
                    </div>
                  ) : (
                    application.id && (
                      <>
                        <img
                          className="h-16 w-16 rounded-lg"
                          src={application.imgURL}
                          alt="Helene avatar"
                        />
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">
                            {application.fullName}
                          </p>
                          <p className="text-rose-400 text-sm font-medium mb-1">
                            {application.email}
                          </p>
                          <CustomBadge
                            text={application.statusBadge.text}
                            color={application.statusBadge.color}
                          />
                        </div>
                      </>
                    )
                  )}
                </div>
                <TextInput
                  name="password"
                  type="password"
                  id="password"
                  value={register.password}
                  change={handleChange}
                  caption="Password"
                  placeholder="••••••••"
                  required={true}
                />
                <TextInput
                  name="confirm_pass"
                  type="password"
                  id="confirm"
                  caption="Confirm Password"
                  placeholder="••••••••"
                  required={true}
                />
                <Button text="Register now" />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-rose-500 hover:underline dark:text-primary-500 cursor-pointer">
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </div>
          {/* <Alert id="register_alert" text={alert.text} icon={alert.icon}>
            <Button
              text="Ok"
              type="button"
              onclick={() =>
                (document.getElementById("register_alert").style.display =
                  "none")
              }
            />
          </Alert>
          <Spinner id="register_spin" /> */}
        </div>
      </section>
    </>
  );
}
