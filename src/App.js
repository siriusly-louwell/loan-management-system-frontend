import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserWithToken } from "./services/redux/slices/authSlice";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import PageLayout from "./pages/PageLayout";
import GuestNav from "./components/navigations/GuestNav";
import ProductList from "./pages/ProductList";
import SearchPage from "./pages/SearchPage";
import About from "./pages/About";
import ProductInfo from "./pages/ProductInfo";
import LoanInfo from "./pages/LoanInfo";
import ApplicantNav from "./components/navigations/ApplicantNav";
import AppNotifications from "./components/modals/AppNotifications";
import InvoiceList from "./pages/InvoiceList";
import Profile from "./pages/Profile";
import EMICalculator from "./pages/EMICalculator";
import ApplicationForm from "./pages/ApplicationForm";
import TransactionForm from "./pages/TransactionForm";
import PersonalInfoForm from "./pages/PersonalInfoForm";
import EmploymentInfoForm from "./pages/EmploymentInfoForm";
import FamilyInfoForm from "./pages/FamilyInfoForm";
import FormRequirements from "./pages/FormRequirements";
import ComakerInfo from "./pages/ComakerInfo";
import CINav from "./components/navigations/CINav";
import CIReport from "./pages/CIReport";
import ReportReview from "./pages/ReportReview";
import AppliedForm from "./pages/AppliedForm";
import StaffNav from "./components/navigations/StaffNav";
import Cashier from "./pages/Cashier";
import AdminNav from "./components/navigations/AdminNav";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import DashOverview from "./pages/DashOverview";
import Notifications from "./components/modals/Notifications";
import AccApplicants from "./pages/AccApplicants";
import AccCI from "./pages/AccCI";
import AccAdmins from "./pages/AccAdmins";
import AccComakers from "./pages/AccComakers";
import Accounts from "./pages/Accounts";
import Alert from "./components/modals/Alert";
import GlobalLoading from "./components/loading components/GlobalLoading";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import UnitList from "./pages/UnitList";
import AccOverview from "./pages/AccOverview";
import InvoicePage from "./pages/InvoicePage";
import Analytics from "./pages/Analytics";
import { UserEntity } from "./services/entities/User";
import CreditHistory from "./components/modals/CreditHistory";

function App() {
  const dispatch = useDispatch();
  const { role } = useSelector(UserEntity);

  useEffect(() => {
    dispatch(loginUserWithToken());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <GlobalLoading />
      <Alert />
      <Routes>
        {/* Outside Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path={`/${role}`} element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Guest Routes */}
        <Route path="/" element={<PageLayout links={<GuestNav />} />}>
          <Route path="" element={<ProductList />} />
          <Route path="find" element={<SearchPage />} />
          <Route path="about" element={<About />} />
          <Route path="guest/unit" element={<ProductInfo />} />
          <Route path="application" element={<LoanInfo />} />
        </Route>

        {/* Customer Routes */}
        <Route
          path="/customer"
          element={<PageLayout links={<ApplicantNav />} path="/customer" />}>
          <Route
            path="app"
            element={
              <ProtectedRoute type="customer">
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="unit"
            element={
              <ProtectedRoute type="customer">
                <ProductInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="history"
            element={
              <ProtectedRoute type="customer">
                <AppNotifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="myloans"
            element={
              <ProtectedRoute type="customer">
                <InvoiceList
                  headText="Loan Applications"
                  path="/customer/loan"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="loan"
            element={
              <ProtectedRoute type="customer">
                <LoanInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="review"
            element={
              <ProtectedRoute type="customer">
                <ReportReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="invoice"
            element={
              <ProtectedRoute type="customer">
                <InvoicePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute type="customer">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="calculate"
            element={
              <ProtectedRoute type="customer">
                <EMICalculator />
              </ProtectedRoute>
            }
          />
          <Route
            path="product"
            element={
              <ProtectedRoute type="customer">
                <ProductInfo />
              </ProtectedRoute>
            }
          />

          <Route path="apply" element={<ApplicationForm />}>
            <Route index element={<TransactionForm />} />
            <Route path="personalinfo" element={<PersonalInfoForm />} />
            <Route path="employinfo" element={<EmploymentInfoForm />} />
            <Route path="familyinfo" element={<FamilyInfoForm />} />
            <Route path="requirements" element={<FormRequirements />} />
            <Route path="comakerform" element={<ComakerInfo />} />
          </Route>
        </Route>

        {/* CI Routes */}
        <Route path="/ci" element={<PageLayout links={<CINav />} path="/ci" />}>
          <Route
            path="app"
            element={
              <ProtectedRoute type="ci">
                <InvoiceList headText="Loan Applications" path="/ci/ciloan" />
              </ProtectedRoute>
            }
          />
          <Route
            path="evaluation"
            element={
              <ProtectedRoute type="ci">
                <InvoiceList
                  headText="Loans Evaluation"
                  path="/ci/cireport"
                  bttnText="Evaluate"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="ciloan"
            element={
              <ProtectedRoute type="ci">
                <LoanInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="cireport"
            element={
              <ProtectedRoute type="ci">
                <CIReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="review"
            element={
              <ProtectedRoute type="ci">
                <ReportReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute type="ci">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="application"
            element={
              <ProtectedRoute type="ci">
                <AppliedForm />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Staff Routes */}
        <Route
          path="/staff"
          element={<PageLayout links={<StaffNav />} path="/staff" />}>
          <Route
            path="app"
            element={
              <ProtectedRoute type="staff">
                <InvoiceList headText="Loan Applications" path="/staff/loan" />
              </ProtectedRoute>
            }
          />
          <Route
            path="cashier"
            element={
              <ProtectedRoute type="staff">
                <Cashier />
              </ProtectedRoute>
            }
          />
          <Route
            path="loan"
            element={
              <ProtectedRoute type="staff">
                <LoanInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="units"
            element={
              <ProtectedRoute type="staff">
                <UnitList />
              </ProtectedRoute>
            }
          />
          <Route
            path="unit"
            element={
              <ProtectedRoute type="staff">
                <ProductInfo staff={true} />
              </ProtectedRoute>
            }
          />
          <Route
            path="history"
            element={
              <ProtectedRoute type="staff">
                <AppNotifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute type="staff">
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="application"
            element={
              <ProtectedRoute type="staff">
                <AppliedForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="review"
            element={
              <ProtectedRoute type="staff">
                <ReportReview />
              </ProtectedRoute>
            }
          />

          <Route
            path="invoice"
            element={
              <ProtectedRoute type="staff">
                <InvoicePage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={<PageLayout links={<AdminNav />} path="/admin" />}>
          <Route
            path="app"
            element={
              <ProtectedRoute type="admin">
                <Dashboard />
              </ProtectedRoute>
            }>
            <Route
              index
              element={
                <ProtectedRoute type="admin">
                  <DashOverview />
                </ProtectedRoute>
              }
            />
            <Route
              path="overview"
              element={
                <ProtectedRoute type="admin">
                  <DashOverview />
                </ProtectedRoute>
              }
            />
            <Route
              path="notifications"
              element={
                <ProtectedRoute type="admin">
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="invoices"
              element={
                <ProtectedRoute type="admin">
                  <AppNotifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="analytics"
              element={
                <ProtectedRoute type="admin">
                  <Analytics />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="inventory"
            element={
              <ProtectedRoute type="admin">
                <Inventory />
              </ProtectedRoute>
            }
          />
          <Route
            path="loans"
            element={
              <ProtectedRoute type="admin">
                <InvoiceList headText="Loan Applications" path="/admin/loan" type="all" />
              </ProtectedRoute>
            }
          />
          <Route
            path="customer-loans"
            element={
              <ProtectedRoute type="admin">
                <InvoiceList headText="Customer Loans" path="/admin/loan" type="customer" />
              </ProtectedRoute>
            }
          />
          <Route
            path="invoice"
            element={
              <ProtectedRoute type="admin">
                <InvoicePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="credits"
            element={
              <ProtectedRoute type="admin">
                <CreditHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="loan"
            element={
              <ProtectedRoute type="admin">
                <LoanInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute type="admin">
                <AccOverview />
              </ProtectedRoute>
            }
          />
          <Route
            path="overview"
            element={
              <ProtectedRoute type="admin">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="history"
            element={
              <ProtectedRoute type="admin">
                <AppNotifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="customer-payments"
            element={
              <ProtectedRoute type="admin">
                <AppNotifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="application"
            element={
              <ProtectedRoute type="admin">
                <AppliedForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="review"
            element={
              <ProtectedRoute type="admin">
                <ReportReview />
              </ProtectedRoute>
            }
          />

          <Route
            path="accounts"
            element={
              <ProtectedRoute type="admin">
                <Accounts />
              </ProtectedRoute>
            }>
            <Route
              index
              element={
                <ProtectedRoute type="admin">
                  <AccApplicants />
                </ProtectedRoute>
              }
            />
            <Route
              path="applicants"
              element={
                <ProtectedRoute type="admin">
                  <AccApplicants />
                </ProtectedRoute>
              }
            />
            <Route
              path="cis"
              element={
                <ProtectedRoute type="admin">
                  <AccCI />
                </ProtectedRoute>
              }
            />
            <Route
              path="staffs"
              element={
                <ProtectedRoute type="admin">
                  <AccAdmins />
                </ProtectedRoute>
              }
            />
            <Route
              path="customers"
              element={
                <ProtectedRoute type="admin">
                  <AccComakers />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
