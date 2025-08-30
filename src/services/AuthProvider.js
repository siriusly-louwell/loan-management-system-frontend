import { createContext, useContext, useState, useEffect } from "react";
import UserAPI from "./api/UserAPI";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // On app load, check token and set user
    if (token) {
      console.log("token", token);
      setLoading(true);

      UserAPI.fetchUser(token)
        .then((userData) => setUser(userData))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  console.log(user, loading);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
