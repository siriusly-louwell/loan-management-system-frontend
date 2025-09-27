import React from "react";

// Example props: pass an object with all info fields
export default function ApplicationInfoCard({ info = {} }) {
  // Example info structure:
  // {
  //   first_name, middle_name, last_name, gender, contact_num, email, status, birth_day, birth_place,
  //   educ_attain, residence, amortization, rent, sss, tin, comm_standing, home_description,
  //   present_address: {...}, previous_address: {...}, unit_applied: {...}
  // }

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900">
      <section className="max-w-3xl mx-auto p-4">
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-4">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold text-primary-700 dark:text-white">
              LJ
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white truncate">
                Louwell Jay A. Bernalte
              </h2>
              <div className="flex flex-wrap gap-2 items-center mt-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Male
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    true
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                  Status
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Farm 2 Dapco, Panabo City, Davao del Norte
              </span>
            </div>

            <div className="flex flex-col gap-4 sm:gap-y-1 text-center sm:text-right">
              <span className="text-sm text-gray-500 font-medium dark:text-white">
                bernaltelouwell23@gmail.com
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                09678575807
              </span>
            </div>
          </div>
        </section>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Application Information
        </h1>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-4">
          <h2 className="text-2xl font-medium text-gray-800 dark:text-white mb-6">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Marital Status
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {info.status} Single
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Date of Birth
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {info.birth_day} July 23, 2002
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Place of Birth
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {info.birth_place}Polymedic Hospital
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Educational Attainment
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {info.educ_attain}Graduate
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Residential Status
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {info.residence}Owned
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Amortization Monthly
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                ₱{info.amortization}None
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Rent Monthly
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                ₱{info.rent}100,000
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                SSS/GSIS #
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {info.sss}3456
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                TIN #
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {info.tin}45678
              </div>
            </div>
          </div>
          <div className="mb-8">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Community Standing
            </div>
            <div className="font-medium text-gray-900 dark:text-white whitespace-pre-line">
              {info.comm_standing}stand up comedian
            </div>
          </div>
          <div className="mb-8">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Home Description
            </div>
            <div className="font-medium text-gray-900 dark:text-white whitespace-pre-line">
              {info.home_description}
            </div>
          </div>
          {/* Present Address */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Present Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {info.present_address &&
                Object.entries(info.present_address).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {key.replace(/_/g, " ")}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {value}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* Previous Address */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Previous Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {info.previous_address &&
                Object.entries(info.previous_address).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {key.replace(/_/g, " ")}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {value}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* Unit Applied */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Unit Applied
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {info.unit_applied &&
                Object.entries(info.unit_applied).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {key.replace(/_/g, " ")}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {value}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-4">
          <h2 className="text-2xl font-medium text-gray-800 dark:text-white mb-6">
            Employment Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Source of Income
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {info.status} Single
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Immediate Superior
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {info.birth_day} July 23, 2002
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Employment Status
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {info.birth_place}Polymedic Hospital
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Years in Service
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {info.educ_attain}Graduate
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Monthly/Daily Rate
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {info.residence}Owned
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Employer
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                ₱{info.amortization}None
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Employer Address
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                ₱{info.rent}
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Income
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Salary
                </div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {info.sss}3456
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Business
                </div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {info.tin}45678
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Others
                </div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {info.tin}45678
                </div>
              </div>
            </div>
          </div>
          {/* Previous Address */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Previous Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {info.previous_address &&
                Object.entries(info.previous_address).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {key.replace(/_/g, " ")}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {value}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* Unit Applied */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Unit Applied
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {info.unit_applied &&
                Object.entries(info.unit_applied).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {key.replace(/_/g, " ")}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {value}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
