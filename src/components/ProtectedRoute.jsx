import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";
import SmallSpin from "./loading components/SmallSpin";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, type }) {
  const { setAlert } = useAuth();
  const { response, loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const isUnauthorized = !response || response.role != type;

  useEffect(() => {
    if (isUnauthorized && !loading) {
      setAlert({ toggle: true, type: "error", message: "Unauthorized access" });
      setTimeout(() => setAlert({ toggle: false }), 2000);
    }
  }, [isAuthenticated, loading, setAlert]);

  if (loading)
    return (
      <section className="h-[65vh] w-full flex items-center justify-center top-0 dark:bg-gray-800">
        <SmallSpin size={68} />
      </section>
    );
  if (isUnauthorized)
    return <Navigate to="/login" replace />;

  return children;
}
