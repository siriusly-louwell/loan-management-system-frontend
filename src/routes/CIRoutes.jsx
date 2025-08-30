import { Route, Routes } from "react-router-dom";
import PageLayout from "../pages/PageLayout";
import CINav from "../components/navigations/CINav";
import InvoiceList from "../pages/InvoiceList";
import LoanInfo from "../pages/LoanInfo";
import CIReport from "../pages/CIReport";
import ReportReview from "../pages/ReportReview";
import Profile from "../pages/Profile";
import AppliedForm from "../pages/AppliedForm";
import PersonalInfoForm from "../pages/PersonalInfoForm";
import EmploymentInfoForm from "../pages/EmploymentInfoForm";
import FamilyInfoForm from "../pages/FamilyInfoForm";
import FormRequirements from "../pages/FormRequirements";
import ProtectedRoute from "../components/ProtectedRoute";

export default function CIRoutes({ log }) {
  return (
    <Routes>
      <Route
        path="/ci"
        element={<PageLayout links={<CINav />} img={log.pfp} path="/ci" />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <InvoiceList
                id={log.id}
                headText="Loan Applications"
                path="/ci/ciloan"
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="loan"
          element={
            <ProtectedRoute>
              <InvoiceList
                id={log.id}
                headText="Loan Applications"
                path="/ci/ciloan"
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="evaluation"
          element={
            <InvoiceList
              id={log.id}
              headText="Loans Evaluation"
              path="/ci/cireport"
              bttnText="Evaluate"
            />
          }
        />
        {/* <Route path="recommendation" element={<InvoiceList id={log.id} headText="Evaluated Loans" />} /> */}
        <Route path="ciloan" element={<LoanInfo url="/ci" />} />
        <Route path="cireport" element={<CIReport />} />
        <Route path="review" element={<ReportReview />} />
        {/* <Route path="ciappform" element={<CIAppForm />} /> */}
        <Route path="profile" element={<Profile />} />
        <Route path="apply" element={<AppliedForm url="/ci" />}>
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
