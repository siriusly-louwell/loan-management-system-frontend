import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import SmallSpin from "./loading components/SmallSpin";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setLoading } from "../services/redux/slices/uiSlice";

export default function ProtectedRoute({ children, type }) {
  const { user, loading, loggedOut } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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

  if (loading) {
    dispatch(setLoading({ isActive: true, text: "Loading..." }));

    return <div></div>;
  } else dispatch(setLoading({ isActive: false }));

  if (isUnauthorized) return <Navigate to="/login" replace />;

  return children;
}
