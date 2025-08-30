import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";

export default function OtherRoutes({ setLog }) {
  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setLog} />} />
      <Route path="/register" element={<Register setUser={setLog} />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
