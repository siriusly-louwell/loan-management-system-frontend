import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import SmallSpin from "./loading components/SmallSpin";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../services/redux/slices/uiSlice";

export default function ProtectedRoute({ children, type }) {
  // const { response, loading, loggedOut } = useSelector((state) => state.auth);
  const { user, loading, loggedOut } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const isUnauthorized = !response || response.role !== type;
  const isUnauthorized = !user || user.role !== type;

  useEffect(() => {
    if (isUnauthorized && !loading && !loggedOut) {
      dispatch(
        setAlert({
          message: "Unauthorized access",
          type: "error",
        })
      );
    }
  }, [loading, dispatch, isUnauthorized, loggedOut]);

  if (loading)
    return (
      <div
        className="fixed flex left-0 right-0 md:inset-0 h-full w-full flex justify-center items-center bg-gray-100 bg-opacity-50 dark:bg-gray-700 dark:bg-opacity-50">
        <div className="grid gap-3">
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin border-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none">
              <g id="Group 1000003701">
                <circle
                  id="Ellipse 715"
                  cx="26.9998"
                  cy="26.9998"
                  r="20"
                  transform="rotate(90 26.9998 26.9998)"
                  stroke="#b2beb5"
                  strokeWidth="4"
                />
                <path
                  id="Ellipse 716"
                  d="M35.4391 44.7038C37.8203 43.5955 39.9599 42.0291 41.7357 40.094C43.5115 38.1589 44.8887 35.893 45.7888 33.4256C46.6889 30.9582 47.0942 28.3377 46.9816 25.7137C46.8689 23.0896 46.2406 20.5135 45.1323 18.1323C44.0241 15.7512 42.4577 13.6116 40.5226 11.8358C38.5875 10.06 36.3215 8.68269 33.8541 7.7826C31.3867 6.8825 28.7662 6.4772 26.1422 6.58985C23.5182 6.7025 20.942 7.33088 18.5609 8.43912"
                  stroke="url(#paint0_linear_13416_7433)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_13416_7433"
                  x1="0.428554"
                  y1="16.8782"
                  x2="17.3068"
                  y2="53.1429"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ff6b6b" />
                  <stop offset="1" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-rose-600 text-sm font-normal leading-snug dark:text-rose-500">
            Loading...
          </span>
        </div>
      </div>
    );
  if (isUnauthorized) return <Navigate to="/login" replace />;

  return children;
}
