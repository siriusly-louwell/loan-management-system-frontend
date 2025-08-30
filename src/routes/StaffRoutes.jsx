import { Route, Routes } from "react-router-dom";
import PageLayout from "../pages/PageLayout";
import StaffNav from "../components/navigations/StaffNav";
import Cashier from "../pages/Cashier";
import LoanInfo from "../pages/LoanInfo";
import ProductInfo from "../pages/ProductInfo";
import AppNotifications from "../components/modals/AppNotifications";
import Profile from "../pages/Profile";
import AppliedForm from "../pages/AppliedForm";
import PersonalInfoForm from "../pages/PersonalInfoForm";
import FamilyInfoForm from "../pages/FamilyInfoForm";
import FormRequirements from "../pages/FormRequirements";
import ProtectedRoute from "../components/ProtectedRoute";

export default function StaffRoutes() {
  return (
    <Routes>
      <Route
        path="/staff"
        element={
          <PageLayout links={<StaffNav />} img={log.pfp} path="/staff" />
        }>
        <Route
          index
          element={
            <ProtectedRoute>
              <Cashier />
            </ProtectedRoute>
          }
        />
        {/* <Route path="inventory" element={<Inventory />} /> */}
        <Route
          path="cashier"
          element={
            <ProtectedRoute>
              <Cashier />
            </ProtectedRoute>
          }
        />
        <Route
          path="loans"
          element={
            <ProtectedRoute>
              <InvoiceList
                id={log.id}
                headText="Loan Applications"
                path="/staff/loan"
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="loan"
          element={
            <ProtectedRoute>
              <LoanInfo url="/staff" />
            </ProtectedRoute>
          }
        />
        <Route
          path="product"
          element={
            <ProtectedRoute>
              <ProductInfo staff={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="history"
          element={
            <ProtectedRoute>
              <AppNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="loan_his"
          element={
            <ProtectedRoute>
              <AppNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="apply"
          element={
            <ProtectedRoute>
              <AppliedForm url="/staff" />
            </ProtectedRoute>
          }>
          <Route
            index
            element={
              <ProtectedRoute>
                <PersonalInfoForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="personalinfo"
            element={
              <ProtectedRoute>
                <PersonalInfoForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="employinfo"
            element={
              <ProtectedRoute>
                <EmploymentInfoForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="familyinfo"
            element={
              <ProtectedRoute>
                <FamilyInfoForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="requirements"
            element={
              <ProtectedRoute>
                <FormRequirements />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}
