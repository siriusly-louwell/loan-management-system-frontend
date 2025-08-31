import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import SmallSpin from "./loading components/SmallSpin";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../services/redux/slices/uiSlice";

export default function ProtectedRoute({ children, type }) {
  const { response, loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const isUnauthorized = !response || response.role != type;

  useEffect(() => {
    if (isUnauthorized && !loading) {
      dispatch(
        setAlert({
          toggle: true,
          message: "Unauthorized access",
          type: "error",
        })
      );
    }
  }, [isAuthenticated, loading, dispatch]);

  if (loading)
    return (
      <section className="h-[65vh] w-full flex items-center justify-center top-0 dark:bg-gray-800">
        <SmallSpin size={68} />
      </section>
    );
  if (isUnauthorized) return <Navigate to="/login" replace />;

  return children;
}
