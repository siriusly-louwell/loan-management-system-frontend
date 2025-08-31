import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/buttons/Button";
import TextInput from "../components/inputs/TextInput";
import Checkbox from "../components/checkboxes/Checkbox";
import RMCI from "../assets/images/RMCI.png";
import Spinner from "../components/loading components/Spinner";
import UserAPI from "../services/api/UserAPI";
import { useAuth } from "../services/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/redux/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLogin] = useState({});
  const { setUser, setAlert } = useAuth();
  const { isAuthenticated, response, loading, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  function handleChange(event) {
    setLogin({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  }

  async function login(event) {
    event.preventDefault();
    document.getElementById("login_spin").style.display = "flex";

    try {
      const response = await dispatch(loginUser(loginData)).unwrap();
      document.getElementById("login_spin").style.display = "none";
      navigate("/" + response.user.role);
      setAlert({
        toggle: true,
        message: "Login Successful",
        type: "success",
      });
    } catch (error) {
      console.error(error.response);
      setAlert({
        toggle: true,
        message: "Unexpected Error!",
        type: "error",
      });
      document.getElementById("login_spin").style.display = "none";
    }
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
                Login to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={login}>
                <TextInput
                  name="email"
                  type="email"
                  id="email"
                  caption="Your email"
                  value={loginData.email}
                  change={handleChange}
                  placeholder="name@gmail.com"
                  required={true}
                />
                <TextInput
                  name="password"
                  type="password"
                  id="password"
                  caption="Password"
                  value={loginData.password}
                  change={handleChange}
                  placeholder="••••••••"
                  required={true}
                />
                <div className="flex items-center justify-between">
                  <Checkbox
                    name=""
                    id="show_pass"
                    text="Show password"
                    required={false}
                  />
                  <Link className="font-medium text-rose-500 text-sm hover:underline dark:text-primary-500 cursor-pointer">
                    Forgot Password
                  </Link>
                </div>
                <Button text="Login" />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Is your application accepted?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-rose-500 hover:underline dark:text-primary-500 cursor-pointer">
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <Spinner id="login_spin" />
        </div>
      </section>
    </>
  );
}
