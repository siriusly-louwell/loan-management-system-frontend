import { useNavigate } from "react-router-dom";

export default function ChartCard({ label, count, scroll, children }) {
  const navigate = useNavigate();
  function goTo() {
    navigate("/admin/dashboard/analytics");
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: "smooth" });
    }, 1000);
  }
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-700 p-4 md:p-6">
      <div className="flex space-x-2 items-center border-b border-gray-200 dark:border-gray-700 pb-3">
        <dl>
          <dt className="text-base font-semibold mb-1 text-gray-700 dark:text-gray-400">
            {label}
          </dt>
          <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
            {count}
          </dd>
        </dl>
      </div>

      {children}

      <div className="grid grid-cols-1 border-t border-gray-200 dark:border-gray-700 mt-4">
        <div className="flex justify-end items-center pt-5">
          <button
            onClick={goTo}
            className="uppercase text-sm font-semibold inline-flex items-center text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-3 py-2">
            Full Analysis
            <svg
              className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
