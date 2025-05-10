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

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<DashOverview />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="invoices" element={<InvoiceList headText="Invoices" path="/loan" />} />
          </Route>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/accounts" element={<Inventory />} />
          <Route path="/loans" element={<InvoiceList headText="Loan Applications" path="/cashier" />} />
          <Route path="/loan" element={<LoanInfo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product" element={<ProductInfo />} />
          <Route path="/cashier" element={<Cashier />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
