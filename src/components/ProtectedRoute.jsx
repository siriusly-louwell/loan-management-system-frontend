import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";
import SmallSpin from "./loading components/SmallSpin";

export default function ProtectedRoute({ children, type }) {
  const { user, loading, setAlert } = useAuth();
  const isUnauthorized = !user || user.role != type;

  useEffect(() => {
    if (isUnauthorized && !loading) {
      setAlert({ toggle: true, type: "error", message: "Unauthorized access" });

      // setTimeout(() => setAlert({ toggle: false }), 2000);
    }
  }, [isUnauthorized, loading, setAlert]);

  if (loading)
    return (
      <section className="h-[65vh] w-full flex items-center justify-center top-0 bg-opacity-50 dark:bg-gray-800">
        <SmallSpin size={68} />
      </section>
    );
  if (isUnauthorized) return <Navigate to="/login" replace />;

  return children;
}
