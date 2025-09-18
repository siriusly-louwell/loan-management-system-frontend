import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setLoading } from "../services/redux/slices/uiSlice";
import { UserEntity } from "../services/entities/User";

export default function ProtectedRoute({ children, type }) {
  const { loading, loggedOut } = useSelector((state) => state.auth);
  const user = useSelector(UserEntity);
  const dispatch = useDispatch();
  let isUnauthorized = !loading && !loggedOut && !user?.isAuthorized(type);

  if (isUnauthorized || !user.id) {
    dispatch(setAlert({ message: "Unauthorized access", type: "error" }));
  }

  if (loading) {
    dispatch(setLoading({ isActive: true, text: "Loading..." }));

    return <div></div>;
  } else dispatch(setLoading({ isActive: false }));

  if (isUnauthorized || loggedOut) return <Navigate to="/login" replace />;

  return children;
}
