import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductInfo from './pages/ProductInfo';
import ProductList from './pages/ProductList';
import Inventory from './pages/Inventory';
import Cashier from './pages/Cashier';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import LoanInfo from './pages/LoanInfo';
import InvoiceList from './pages/InvoiceList';
import Profile from './pages/Profile';
import CIReport from './pages/CIReport';
import CoMakerForm from './pages/CoMakerForm';
import PageNotFound from './pages/PageNotFound';
import PageLayout from './pages/PageLayout';
import DashOverview from './pages/DashOverview';
import Notifications from './components/modals/Notifications';
import Accounts from './pages/Accounts';
import AccApplicants from './pages/AccApplicants';
import AccCI from './pages/AccCI';
import AccAdmins from './pages/AccAdmins';
import AccComakers from './pages/AccComakers';
import Invoice from './pages/Invoice';
import AppNotifications from './components/modals/AppNotifications';
import FormRequirements from './pages/FormRequirements';
import PersonalInfoForm from './pages/PersonalInfoForm';
import FamilyInfoForm from './pages/FamilyInfoForm';
import EmploymentInfoForm from './pages/EmploymentInfoForm';
import CILoanInfo from './pages/CILoanInfo';
import CIAppForm from './pages/CIAppForm';
import About from './pages/About';
import GuestNav from './components/navigations/GuestNav';
import AdminNav from './components/navigations/AdminNav';
import StaffNav from './components/navigations/StaffNav';
import ApplicantNav from './components/navigations/ApplicantNav';
import CINav from './components/navigations/CINav';
import CoMakerNav from './components/navigations/CoMakerNav';
import EMICalculator from './pages/EMICalculator';
import CustomBttn from './components/buttons/CustomBttn';
import AppliedForm from './pages/AppliedForm';
import ComakerInfo from './pages/ComakerInfo';
import TransactionForm from './pages/TransactionForm';
import SearchPage from './pages/SearchPage';
import { useState } from 'react';
import UnitsAll from './pages/UnitsAll';
import UnitsNew from './pages/UnitsNew';
import ReportReview from './pages/ReportReview';

function App() {
  const [log, setLog] = useState({});

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<PageLayout links={<GuestNav />} />}>
            <Route path="" element={<ProductList url="/unit" />}>
              <Route index element={<UnitsAll />} />
              <Route path="new" element={<UnitsNew />} />
              <Route path="top" element={<UnitsNew />} />
              <Route path="repo" element={<UnitsNew />} />
            </Route>
            <Route path="prodlist" element={<ProductList url="/unit" />}>
              <Route index element={<UnitsAll />} />
              <Route path="new" element={<UnitsNew />} />
              <Route path="top" element={<UnitsNew />} />
              <Route path="repo" element={<UnitsNew />} />
            </Route>
            <Route path="find" element={<SearchPage />} />
            <Route path="about" element={<About />} />
            <Route path="unit" element={<ProductInfo />} />
            <Route path="application" element={<LoanInfo />} />
          </Route>

          <Route path="/customer" element={<PageLayout links={<ApplicantNav />} img={log.pfp} path="/customer" />}>
            {/* <Route index element={<ProductList url="/customer/product" />} /> */}
            <Route path="" element={<ProductList url="/customer/product" />}>
              <Route index element={<UnitsAll />} />
              <Route path="new" element={<UnitsNew />} />
              <Route path="top" element={<UnitsNew />} />
              <Route path="repo" element={<UnitsNew />} />
            </Route>
            <Route path="prodlist" element={<ProductList url="/customer/product" />}>
              <Route index element={<UnitsAll />} />
              <Route path="new" element={<UnitsNew />} />
              <Route path="top" element={<UnitsNew />} />
              <Route path="repo" element={<UnitsNew />} />
            </Route>
            {/* <Route path="prodlist" element={<ProductList url="/customer/product" />} /> */}
            <Route path="history" element={<AppNotifications />} />
            <Route path="myloans" element={<InvoiceList id={log.id} headText="Loan Applications" path="/customer/loan" record={`/${log.id}?by=user_id`} />} />
            {/* <Route path="myloans" element={<InvoiceList id={log.id} headText="My Loans" />} /> */}
            <Route path="loan" element={<LoanInfo>
              <CustomBttn text="Cancel Application" className="flex items-center w-full justify-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-red-600 dark:border-red-500 dark:text-red-200 dark:hover:text-white dark:hover:bg-red-800 dark:focus:ring-red-900" />
            </LoanInfo>} />
            <Route path="invoice" element={<Invoice />} />
            <Route path="profile" element={<Profile />} />
            <Route path="calculate" element={<EMICalculator />} />
            <Route path="product" element={<ProductInfo />} />

            <Route path="apply" element={<ApplicationForm />}>
              <Route index element={<TransactionForm />} />
              <Route path="transaction" element={<TransactionForm />} />
              <Route path="personalinfo" element={<PersonalInfoForm />} />
              <Route path="employinfo" element={<EmploymentInfoForm />} />
              <Route path="familyinfo" element={<FamilyInfoForm />} />
              <Route path="requirements" element={<FormRequirements />} />
              <Route path="comakerform" element={<ComakerInfo />} />
            </Route>
          </Route>

          <Route path="/comaker" element={<PageLayout links={<CoMakerNav />} path="/comaker" />}>
            <Route index element={<InvoiceList id={log.id} headText="Liable Applications" path="/comaker/comakeform" bttnText="Oblige Loan" />} /> 
            <Route path="obligeloans" element={<InvoiceList id={log.id} headText="Liable Applications" path="/comaker/comakeform" bttnText="Oblige Loan" />} />
            <Route path="cosigned" element={<InvoiceList id={log.id} headText="Co-Signed Loans" path="/comaker/ciloan" />} />
            <Route path="alerts" element={<Notifications />} />
            <Route path="ciloan" element={<CILoanInfo />} />
            <Route path="comakeform" element={<CoMakerForm />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          <Route path="/ci" element={<PageLayout links={<CINav />} img={log.pfp} path="/ci" />}>
            <Route index element={<InvoiceList id={log.id} headText="Loan Applications" path="/ci/ciloan" />} />
            <Route path="loanapplications" element={<InvoiceList id={log.id} headText="Loan Applications" path="/ci/ciloan" />} />
            <Route path="evaluation" element={<InvoiceList id={log.id} headText="Loans Evaluation" path="/ci/cireport" bttnText="Evaluate" />} />
            {/* <Route path="recommendation" element={<InvoiceList id={log.id} headText="Evaluated Loans" />} /> */}
            <Route path="ciloan" element={<LoanInfo />} />
            <Route path="cireport" element={<CIReport />} />
            <Route path="review" element={<ReportReview />} />
            {/* <Route path="ciappform" element={<CIAppForm />} /> */}
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/staff" element={<PageLayout links={<StaffNav />} img={log.pfp} path="/staff" />}>
            <Route index element={<Cashier />} />
            {/* <Route path="inventory" element={<Inventory />} /> */}
            <Route path="cashier" element={<Cashier />} />
            <Route path="loans" element={<InvoiceList id={log.id} headText="Loan Applications" path="/staff/loan" />} />
            <Route path="loan" element={<LoanInfo />} />
            <Route path="product" element={<ProductInfo staff={true} />} />
            <Route path="history" element={<AppNotifications />} />
            <Route path="loan_his" element={<AppNotifications />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/admin" element={<PageLayout links={<AdminNav />} path="/admin" />}>
            <Route path="" element={<Inventory />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="loans" element={<InvoiceList id={log.id} headText="Loan Applications" path="/admin/loan" />} />
            <Route path="invoice" element={<Invoice />} />
            <Route path="loan" element={<LoanInfo />} />
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
              <Route path="invoices" element={<InvoiceList id={log.id} headText="Invoices" path="/admin/invoice" />} />
            </Route>

            <Route path="accounts" element={<Accounts />}>
              <Route index element={<AccApplicants />} />
              <Route path="applicants" element={<AccApplicants />} />
              <Route path="cis" element={<AccCI />} />
              <Route path="staffs" element={<AccAdmins />} />
              <Route path="customers" element={<AccComakers />} />
            </Route>
          </Route>
        <Route path="/login" element={<Login setUser={setLog} />} />
        <Route path="/register" element={<Register setUser={setLog} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
