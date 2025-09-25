import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setLoading } from "../services/redux/slices/uiSlice";
import { UserEntity } from "../services/entities/User";
import { useEffect } from "react";

export default function ProtectedRoute({ children, type }) {
  const { authLoading, loggedOut } = useSelector((state) => state.auth);
  const user = useSelector(UserEntity);
  const dispatch = useDispatch();
  let isUnauthorized = !authLoading && !loggedOut && !user?.isAuthorized(type);

  useEffect(() => {
    if (isUnauthorized)
      dispatch(setAlert({ message: "Unauthorized access", type: "error" }));
  }, [isUnauthorized, dispatch]);

  useEffect(() => {
    if (authLoading)
      dispatch(setLoading({ isActive: true, text: "Loading..." }));
    else dispatch(setLoading({ isActive: false }));
  }, [authLoading, dispatch]);

  if (authLoading) return <div></div>;
  if (loggedOut) return <Navigate to="/login" replace />;
  if (isUnauthorized) return <Navigate to="/unauthorized" replace />;

  return children;
}
