import { createContext, useContext, useState, useEffect } from "react";
import UserAPI from "./api/UserAPI";
import Alert from "../components/modals/Alert";
import { useDispatch, useSelector } from "react-redux";
import { loginUserWithToken } from "./redux/slices/authSlice";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({ role: "guest" });
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ toggle: false });
  const { response } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // On app load, check token and set user
    // if (token) {
    //   dispatch(loginUserWithToken(token));
    // }
    // if (token) {
    //   UserAPI.fetchUser(token)
    //     .then((userData) => setUser(userData))
    //     .catch(() => setUser({ role: "guest" }))
    //     .finally(() => setLoading(false));
    // } else {
    //   setLoading(false);
    // }
  }, []);

  // useEffect(() => {
  //   setTimeout(() => setAlert({ toggle: false }), 3000);
  // }, [alert]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setAlert }}>
      <Alert
        type={alert.type}
        message={alert.message}
        isVisible={alert.toggle}
      />
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
