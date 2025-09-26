import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UserEntity } from "../services/entities/User";

export default function AccOverview() {
  const user = useSelector(UserEntity);
  const { authLoading } = useSelector((state) => state.auth);

  // Settings state (for demo only)
  const [darkMode, setDarkMode] = useState(false);
  const [incomeThreshold, setIncomeThreshold] = useState(20000);
  const [dtiThreshold, setDtiThreshold] = useState(40);
  const [emiThreshold, setEmiThreshold] = useState(30);

  // Demo handlers
  const handleDarkModeToggle = () => setDarkMode((d) => !d);
  const handleChangePassword = () =>
    alert("Change password dialog (not implemented)");
  const handleEditProfile = () =>
    alert("Edit profile dialog (not implemented)");

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-50 dark:bg-gray-900 py-8">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold text-primary-700 dark:text-white">
            {authLoading ? (
              user.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
            ) : (
              <img src={user.imgURL()} alt="user" className="h-full object-cover rounded-[]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white truncate">
              {user.fullName}
            </h2>
            <div className="flex flex-wrap gap-2 items-center mt-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.roleName}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.statusName === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                {user.statusName}
              </span>
            </div>
          </div>
          <button
            onClick={handleEditProfile}
            className="ml-auto mt-4 sm:mt-0 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium shadow focus:outline-none focus:ring-2 focus:ring-rose-400">
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Email
            </span>
            <span className="text-gray-800 dark:text-white break-all">
              {user.email}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Contact
            </span>
            <span className="text-gray-800 dark:text-white">
              {user.contact}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Gender
            </span>
            <span className="text-gray-800 dark:text-white">
              {user.genderType}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Role
            </span>
            <span className="text-gray-800 dark:text-white">
              {user.roleName}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Account & Loan Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 flex items-center justify-between shadow-sm">
            <div>
              <div className="font-medium text-gray-800 dark:text-white mb-1">
                Dark Mode
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-300">
                Toggle dark/light theme
              </div>
            </div>
            <button
              onClick={handleDarkModeToggle}
              className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 focus:outline-none ${
                darkMode ? "bg-rose-600" : "bg-gray-300"
              }`}
              aria-label="Toggle dark mode">
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                  darkMode ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 flex items-center justify-between shadow-sm">
            <div>
              <div className="font-medium text-gray-800 dark:text-white mb-1">
                Change Password
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-300">
                Update your account password
              </div>
            </div>
            <button
              onClick={handleChangePassword}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-medium shadow">
              Change
            </button>
          </div>

          {/* Loan Thresholds */}
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-4">
            Loan Thresholds
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 shadow-sm col-span-1 md:col-span-2">
            <div className="font-medium text-gray-800 dark:text-white mb-2">
              Loan Thresholds
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center">
                <label className="block text-xs text-gray-500 dark:text-gray-300 mb-1">
                  Min. Income (₱)
                </label>
                <input
                  type="number"
                  className="w-full max-w-[20%] rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-2 text-gray-800 dark:text-white focus:ring-primary-400 focus:border-primary-400 text-sm"
                  value={incomeThreshold}
                  onChange={(e) => setIncomeThreshold(e.target.value)}
                  min={0}
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="block text-xs text-gray-500 dark:text-gray-300 mb-1">
                  DTI (%)
                </label>
                <input
                  type="number"
                  className="w-full max-w-[20%] rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-2 text-gray-800 dark:text-white focus:ring-primary-400 focus:border-primary-400 text-sm"
                  value={dtiThreshold}
                  onChange={(e) => setDtiThreshold(e.target.value)}
                  min={0}
                  max={100}
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="block text-xs text-gray-500 dark:text-gray-300 mb-1">
                  EMI (%)
                </label>
                <input
                  type="number"
                  className="w-full max-w-[20%] rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-2 text-gray-800 dark:text-white focus:ring-primary-400 focus:border-primary-400 text-sm"
                  value={emiThreshold}
                  onChange={(e) => setEmiThreshold(e.target.value)}
                  min={0}
                  max={100}
                />
              </div>
            </div>
          </div>

          {/* Other Loan Management Settings */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 shadow-sm col-span-1 md:col-span-2">
            <div className="font-medium text-gray-800 dark:text-white mb-2">
              Other Loan Management Settings
            </div>
            <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc pl-5 space-y-1">
              <li>Loan approval notifications</li>
              <li>Auto-calculate amortization</li>
              <li>Enable/disable prepayment penalty</li>
              <li>Custom grace period (days)</li>
              <li>...and more</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
