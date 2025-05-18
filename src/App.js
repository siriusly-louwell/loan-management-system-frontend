import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
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
import Button from './components/buttons/Button';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<PageLayout links={<GuestNav />} />}>
            <Route index element={<ProductList />} />
            <Route path="prodlist" element={<ProductList />} />
            <Route path="about" element={<About />} />
          </Route>

          <Route path="/applicant" element={<PageLayout links={<ApplicantNav />} path="/applicant" />}>
            <Route index element={<ProductList />} />
            <Route path="prodlist" element={<ProductList />} />
            <Route path="history" element={<AppNotifications />} />
            <Route path="applications" element={<InvoiceList headText="Loan Applications" path="/applicant/loan" />} />
            <Route path="myloans" element={<InvoiceList headText="My Loans" />} />
            <Route path="loan" element={<LoanInfo>
              <CustomBttn text="Cancel Application" className="flex items-center w-full justify-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-red-600 dark:border-red-500 dark:text-red-200 dark:hover:text-white dark:hover:bg-red-800 dark:focus:ring-red-900" />
            </LoanInfo>} />
            <Route path="invoice" element={<Invoice />} />
            <Route path="profile" element={<Profile />} />
            <Route path="calculate" element={<EMICalculator />} />
            <Route path="product" element={<ProductInfo />} />

            <Route path="apply" element={<ApplicationForm />}>
              <Route index element={<PersonalInfoForm />} />
              <Route path="personalinfo" element={<PersonalInfoForm />} />
              <Route path="employinfo" element={<EmploymentInfoForm />} />
              <Route path="familyinfo" element={<FamilyInfoForm />} />
              <Route path="requirements" element={<FormRequirements />} />
            </Route>
          </Route>

          <Route path="/comaker" element={<PageLayout links={<CoMakerNav />} path="/comaker" />}>
            <Route index element={<InvoiceList headText="Liable Applications" path="/comaker/comakeform" bttnText="Oblige Loan" />} /> 
            <Route path="obligeloans" element={<InvoiceList headText="Liable Applications" path="/comaker/comakeform" bttnText="Oblige Loan" />} />
            <Route path="cosigned" element={<InvoiceList headText="Co-Signed Loans" path="/comaker/ciloan" />} />
            <Route path="alerts" element={<Notifications />} />
            <Route path="ciloan" element={<CILoanInfo />} />
            <Route path="comakeform" element={<CoMakerForm />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          <Route path="/ci" element={<PageLayout links={<CINav />} path="/ci" />}>
            <Route index element={<InvoiceList headText="Loan Applications" path="/ci/ciloan" />} />
            <Route path="loanapplications" element={<InvoiceList headText="Loan Applications" path="/ci/ciloan" />} />
            <Route path="evaluation" element={<InvoiceList headText="Loans Evaluation" path="/ci/cireport" bttnText="Evaluate" />} />
            <Route path="recommendation" element={<InvoiceList headText="Evaluated Loans" />} />
            <Route path="ciloan" element={<CILoanInfo />} />
            <Route path="cireport" element={<CIReport />} />
            <Route path="ciappform" element={<CIAppForm />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/staff" element={<PageLayout links={<StaffNav />} path="/staff" />}>
            <Route index element={<Inventory />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="cashier" element={<Cashier />} />
            <Route path="loans" element={<InvoiceList headText="Loan Applications" path="/staff/loan" />} />
            <Route path="loan" element={<LoanInfo>
              <Button text="Accept Application" />
            </LoanInfo>} />
            <Route path="emi" element={<EMICalculator />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/admin" element={<PageLayout links={<AdminNav />} path="/admin" />}>
            <Route index element={<InvoiceList headText="Loan Applications" path="/admin/loan" />} />
            {/* <Route path="inventory" element={<Inventory />} /> */}
            <Route path="loans" element={<InvoiceList headText="Loan Applications" path="/admin/loan" />} />
            <Route path="invoice" element={<Invoice />} />
            <Route path="loan" element={<LoanInfo />} />
            <Route path="profile" element={<Profile />} />
            {/* <Route path="cashier" element={<Cashier />} /> */}

            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<DashOverview />} />
              <Route path="overview" element={<DashOverview />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="invoices" element={<InvoiceList headText="Invoices" path="/admin/invoice" />} />
            </Route>

            <Route path="accounts" element={<Accounts />}>
              <Route index element={<AccApplicants />} />
              <Route path="applicants" element={<AccApplicants />} />
              <Route path="cis" element={<AccCI />} />
              <Route path="staffs" element={<AccAdmins />} />
              <Route path="comakers" element={<AccComakers />} />
            </Route>
          </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
