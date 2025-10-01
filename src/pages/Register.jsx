import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/buttons/Button";
import TextInput from "../components/inputs/TextInput";
import RMCI from "../assets/images/RMCI.png";
import Alert from "../components/Alert";
import Spinner from "../components/loading components/Spinner";
import PfpLabel from "../components/PfpLabel";
import Image from "../assets/icons/Image";
import CustomBadge from "../components/badges/CustomBadge";
import UserAPI from "../services/api/UserAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoan,
  setLoading,
} from "../services/redux/slices/applicationSlice";
import { ApplicationEntity } from "../services/entities/Application";

export default function Register({ setUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const application = useSelector(ApplicationEntity);
  const { loanLoading } = useSelector((state) => state.application);
  const [record, setRecord] = useState("");
  // const [applicant, setApplicant] = useState({});
  const [register, setRegister] = useState({
    role: "customer",
    status: "active",
  });
  const [alert, setAlert] = useState({});
  const emptyState = record !== "" && application.id === undefined;

  console.log(register);

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    if (record) dispatch(fetchLoan({ id: record, by: "record_id" }));
  }, [record, dispatch]);

  useEffect(() => {
    setRegister({
      ...register,
      contact: application.contact_num,
      gender: application.gender,
      first_name: application.first_name,
      last_name: application.last_name,
      email: application.email,
    });
  }, [application]);

  // useEffect(() => {
  //   if (record !== "") {
  //     fetch(`http://localhost:8000/api/application/${record}?by=record_id`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setApplicant(data);
  //         setRegister({
  //           ...register,
  //           first_name: data.first_name,
  //           last_name: data.last_name,
  //           email: data.email,
  //           record_id: data.record_id,
  //         });
  //       })
  //       .catch(() => setApplicant({ none: 0 }));
  //   }
  // }, [record]);

  async function handleSubmit(event) {
    event.preventDefault();
    document.getElementById("register_spin").style.display = "flex";

    try {
      //   const response = await fetch("http://127.1:8000/api/account", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //     },
      //     body: JSON.stringify(register),
      //   });

      //   const result = await response.json();
      const response = await UserAPI.register(register);

      setAlert({
        text: response.message,
        icon: response.type === "valid" ? "done" : "warn",
      });
      console.log("Success: ", response);
      if (!response.ok) throw new Error("Update failed");
      else {
        document.getElementById("register_alert").style.display = "block";
        document.getElementById("register_spin").style.display = "none";

        if (response.type == "valid") {
          setUser(response.user);
          console.log(response.user);

          setTimeout(() => {
            navigate("/customer");
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Error: ", error);
      setAlert({
        text: "Unexpected error!",
        icon: "warn",
      });
      document.getElementById("register_spin").style.display = "none";
      document.getElementById("register_alert").style.display = "block";
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
          <Alert id="register_alert" text={alert.text} icon={alert.icon}>
            <Button
              text="Ok"
              type="button"
              onclick={() =>
                (document.getElementById("register_alert").style.display =
                  "none")
              }
            />
          </Alert>
          <Spinner id="register_spin" />
        </div>
      </section>
    </>
  );
}
