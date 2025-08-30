import { Navigate } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  console.log(user, loading);

  // setTimeout(() => {

  // }, 2000)
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;


  return children;
}
