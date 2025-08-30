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

export default function AdminRoutes({log}) {
  return (
    <Routes>
      <Route
        path="/admin"
        element={<PageLayout links={<AdminNav />} path="/admin" />}>
        <Route path="" element={<Inventory />} />
        <Route path="inventory" element={<Inventory />} />
        <Route
          path="loans"
          element={
            <InvoiceList
              id={log.id}
              headText="Loan Applications"
              path="/admin/loan"
            />
          }
        />
        <Route path="invoice" element={<Invoice />} />
        <Route path="loan" element={<LoanInfo url="/admin" />} />
        <Route path="profile" element={<Profile />} />
        <Route path="history" element={<AppNotifications />} />
        <Route path="apply" element={<AppliedForm url="/admin" />}>
          <Route index element={<PersonalInfoForm />} />
          <Route path="personalinfo" element={<PersonalInfoForm />} />
          <Route path="employinfo" element={<EmploymentInfoForm />} />
          <Route path="familyinfo" element={<FamilyInfoForm />} />
          <Route path="requirements" element={<FormRequirements />} />
        </Route>

        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<DashOverview />} />
          <Route path="overview" element={<DashOverview />} />
          <Route path="notifications" element={<Notifications />} />
          <Route
            path="invoices"
            element={
              <InvoiceList
                id={log.id}
                headText="Invoices"
                path="/admin/invoice"
              />
            }
          />
        </Route>

        <Route path="accounts" element={<Accounts />}>
          <Route index element={<AccApplicants />} />
          <Route path="applicants" element={<AccApplicants />} />
          <Route path="cis" element={<AccCI />} />
          <Route path="staffs" element={<AccAdmins />} />
          <Route path="customers" element={<AccComakers />} />
        </Route>
      </Route>
    </Routes>
  );
}
