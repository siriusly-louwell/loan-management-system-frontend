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

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashOverview />} />
            <Route path="overview" element={<DashOverview />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="invoices" element={<InvoiceList headText="Invoices" path="/invoice" />} />
          </Route>
          <Route path="/accounts" element={<Accounts />}>
            <Route index element={<AccApplicants />} />
            <Route path="applicants" element={<AccApplicants />} />
            <Route path="ci" element={<AccCI />} />
            <Route path="admins" element={<AccAdmins />} />
            <Route path="comakers" element={<AccComakers />} />
          </Route>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/loans" element={<InvoiceList headText="Loan Applications" path="/cashier" />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/loan" element={<LoanInfo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product" element={<ProductInfo />} />
          <Route path="/cashier" element={<Cashier />} />

          <Route path="/apply" element={<ApplicationForm />}>
            <Route index element={<PersonalInfoForm />} />
            <Route path="personalinfo" element={<PersonalInfoForm />} />
            <Route path="employinfo" element={<EmploymentInfoForm />} />
            <Route path="familyinfo" element={<FamilyInfoForm />} />
            <Route path="requirements" element={<FormRequirements />} />
          </Route>
          <Route path="/history" element={<AppNotifications />} />
          <Route path="/applications" element={<InvoiceList headText="Loan Applications" path="/loan" />} />
          <Route path="/myloans" element={<InvoiceList headText="My Loans" path="" />} />

          {/* <Route path="/" element={<InvoiceList headText="Loan Applications" path="/ciloan" />} /> */}
          <Route path="/evaluation" element={<InvoiceList headText="Loans Evaluation" path="/cireport" bttnText="Evaluate" />} />
          <Route path="/recommendation" element={<InvoiceList headText="Evaluated Loans" path="" />} />
          <Route path="/ciloan" element={<CILoanInfo />} />
          <Route path="/cireport" element={<CIReport />} />
          <Route path="/ciappform" element={<CIAppForm />} />
          
          {/* <Route path="/" element={<InvoiceList headText="Liable Applications" path="/comakeform" bttnText="Oblige Loan" />} /> */}
          <Route path="/cosigned" element={<InvoiceList headText="Co-Signed Loans" path="/ciloan" />} />
          <Route path="/alerts" element={<Notifications />} />
          <Route path="/comakeform" element={<CoMakerForm />} />

          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
