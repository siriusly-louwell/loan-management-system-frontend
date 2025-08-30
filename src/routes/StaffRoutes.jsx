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

export default function StaffRoutes() {
  return (
    <Routes>
      <Route
        path="/staff"
        element={
          <PageLayout links={<StaffNav />} img={log.pfp} path="/staff" />
        }>
        <Route index element={<Cashier />} />
        {/* <Route path="inventory" element={<Inventory />} /> */}
        <Route path="cashier" element={<Cashier />} />
        <Route
          path="loans"
          element={
            <InvoiceList
              id={log.id}
              headText="Loan Applications"
              path="/staff/loan"
            />
          }
        />
        <Route path="loan" element={<LoanInfo url="/staff" />} />
        <Route path="product" element={<ProductInfo staff={true} />} />
        <Route path="history" element={<AppNotifications />} />
        <Route path="loan_his" element={<AppNotifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="apply" element={<AppliedForm url="/staff" />}>
          <Route index element={<PersonalInfoForm />} />
          <Route path="personalinfo" element={<PersonalInfoForm />} />
          <Route path="employinfo" element={<EmploymentInfoForm />} />
          <Route path="familyinfo" element={<FamilyInfoForm />} />
          <Route path="requirements" element={<FormRequirements />} />
        </Route>
      </Route>
    </Routes>
  );
}
