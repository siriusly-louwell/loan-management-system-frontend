import { Route, Routes } from "react-router-dom";
import PageLayout from "../pages/PageLayout";
import AdminNav from "../components/navigations/AdminNav";
import Inventory from "../pages/Inventory";
import InvoiceList from "../pages/InvoiceList";
import Invoice from "../pages/Invoice";
import LoanInfo from "../pages/LoanInfo";
import Profile from "../pages/Profile";
import AppNotifications from "../components/modals/AppNotifications";
import AppliedForm from "../pages/AppliedForm";
import PersonalInfoForm from "../pages/PersonalInfoForm";
import EmploymentInfoForm from "../pages/EmploymentInfoForm";
import FamilyInfoForm from "../pages/FamilyInfoForm";
import FormRequirements from "../pages/FormRequirements";
import Dashboard from "../pages/Dashboard";
import DashOverview from "../pages/DashOverview";
import Notifications from "../components/modals/Notifications";
import Accounts from "../pages/Accounts";
import AccApplicants from "../pages/AccApplicants";
import AccCI from "../pages/AccCI";
import AccAdmins from "../pages/AccAdmins";
import AccComakers from "../pages/AccComakers";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AdminRoutes({ log }) {
  return (
    <Routes>
      <Route
        path="/admin"
        element={<PageLayout links={<AdminNav />} path="/admin" />}>
        <Route
          path=""
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="inventory"
          element={
            <ProtectedRoute>
              <Inventory />
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
                path="/admin/loan"
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="invoice"
          element={
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          }
        />
        <Route
          path="loan"
          element={
            <ProtectedRoute>
              <LoanInfo url="/admin" />
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
          path="history"
          element={
            <ProtectedRoute>
              <AppNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="apply"
          element={
            <ProtectedRoute>
              <AppliedForm url="/admin" />
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

        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
          <Route
            index
            element={
              <ProtectedRoute>
                <DashOverview />
              </ProtectedRoute>
            }
          />
          <Route
            path="overview"
            element={
              <ProtectedRoute>
                <DashOverview />
              </ProtectedRoute>
            }
          />
          <Route
            path="notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="invoices"
            element={
              <ProtectedRoute>
                <InvoiceList
                  id={log.id}
                  headText="Invoices"
                  path="/admin/invoice"
                />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="accounts"
          element={
            <ProtectedRoute>
              <Accounts />
            </ProtectedRoute>
          }>
          <Route
            index
            element={
              <ProtectedRoute>
                <AccApplicants />
              </ProtectedRoute>
            }
          />
          <Route
            path="applicants"
            element={
              <ProtectedRoute>
                <AccApplicants />
              </ProtectedRoute>
            }
          />
          <Route
            path="cis"
            element={
              <ProtectedRoute>
                <AccCI />
              </ProtectedRoute>
            }
          />
          <Route
            path="staffs"
            element={
              <ProtectedRoute>
                <AccAdmins />
              </ProtectedRoute>
            }
          />
          <Route
            path="customers"
            element={
              <ProtectedRoute>
                <AccComakers />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}
