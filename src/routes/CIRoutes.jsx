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
            <ProtectedRoute>
              <InvoiceList
                id={log.id}
                headText="Loans Evaluation"
                path="/ci/cireport"
                bttnText="Evaluate"
              />
            </ProtectedRoute>
          }
        />
        {/* <Route path="recommendation" element={<InvoiceList id={log.id} headText="Evaluated Loans" />} /> */}
        <Route
          path="ciloan"
          element={
            <ProtectedRoute>
              <LoanInfo url="/ci" />
            </ProtectedRoute>
          }
        />
        <Route
          path="cireport"
          element={
            <ProtectedRoute>
              <CIReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="review"
          element={
            <ProtectedRoute>
              <ReportReview />
            </ProtectedRoute>
          }
        />
        {/* <Route path="ciappform" element={<CIAppForm />} /> */}
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
              <AppliedForm url="/ci" />
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
