import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import HamburgerMenu from "./buttons/HamburgerMenu";
import AvatarBttn from "./buttons/AvatarBttn";
import MenuLink from "./links/MenuLink";
import Button from "./buttons/Button";
import RMCI from "../assets/images/RMCI.png";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPageNum,
  setAlert,
  setLoading,
  toggleModal,
} from "../services/redux/slices/uiSlice";
import {
  clearAuth,
  fetchAccount,
  logout,
} from "../services/redux/slices/authSlice";
import { clearID } from "../services/redux/slices/unitSlice";
import { UserEntity } from "../services/entities/User";
import { resetInput } from "../services/redux/slices/formSlice";
import { clearLoan } from "../services/redux/slices/applicationSlice";
import { clearPayment } from "../services/redux/slices/paymentSlice";
import { clearReport } from "../services/redux/slices/reportSlice";

export default function Navbar({ links, path }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(UserEntity);
  const { modals } = useSelector((state) => state.ui);
  const apply = [
    "/customer/apply",
    "/customer/apply/personalinfo",
    "/customer/apply/employinfo",
    "/customer/apply/familyinfo",
    "/customer/apply/requirements",
    "/customer/apply/comakerform",
  ];

  function toggleLogout() {
    dispatch(setLoading({ isActive: true, text: "Logging out..." }));
    dispatch(toggleModal({ name: "profile", value: modals.profile }));

    setTimeout(() => {
      dispatch(logout());
      dispatch(
        setAlert({
          message: "Logged out successfully",
          type: "success",
        })
      );
      dispatch(clearID());
      dispatch(resetInput());
      dispatch(clearLoan());
      dispatch(clearReport());
      dispatch(clearPayment());
      dispatch(clearPageNum());
      dispatch(setLoading({ isActive: false }));
      localStorage.clear() 
    }, 2000);

    setTimeout(() => {
      dispatch(clearAuth());
    }, 3000);
  }

  const applyPath = apply.find((path) => location.pathname === path);

  return (
    !applyPath && (
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="http://localhost:3000"
            className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={RMCI} className="h-8" alt="Rhean Motor Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Rhean Motor Center
            </span>
          </a>
          <div className="justify-items-center flex space-x-4 md:order-2 sm:space-y-4 rtl:space-x-reverse">
            {user?.role === "guest" ? (
              <Button text="Login" onclick={() => navigate("/login")} />
            ) : (
              <div className="relative">
                <AvatarBttn
                  pfp={user?.imgURL || user?.initials}
                  dropMenu={() =>
                    dispatch(
                      toggleModal({
                        name: "profile",
                        value: modals.profile,
                      })
                    )
                  }
                />
                {modals.profile && (
                  <DropdownMenu>
                    {user && (
                      <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">
                          {user?.fullName}
                        </span>
                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                          {user?.email}
                        </span>
                      </div>
                    )}
                    <MenuLink
                      pathName="Profile"
                      path={`${path}/profile`}
                      click={() => {
                        console.log(user.id);
                        dispatch(fetchAccount(user.id));
                        dispatch(
                          toggleModal({
                            name: "profile",
                            value: modals.profile,
                          })
                        );
                      }}
                    />
                    {!user?.isAdmin && <MenuLink pathName="Settings" path="" />}
                    <MenuLink pathName="Log out" click={toggleLogout} />
                  </DropdownMenu>
                )}
              </div>
            )}
            <HamburgerMenu />
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {links}
            </ul>
          </div>
        </div>
      </nav>
    )
  );
}
