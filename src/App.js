import NavBar from './components/Navbar';
import Login from './pages/Login';
import Footer from './components/Footer';
import ProductInfo from './pages/ProductInfo';
import ProductList from './pages/ProductList';
import Inventory from './pages/Inventory';
import CreateProduct from './pages/CreateProduct';
import Cashier from './pages/Cashier';
import SideBar from './components/SideBar';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import LoanInfo from './pages/LoanInfo';

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      <NavBar />
      {/* <ProductInfo /> */}
      {/* <ProductList /> */}
      {/* <Inventory /> */}
      {/* <CreateProduct /> */}
      {/* <Cashier /> */}
      {/* <Dashboard /> */}
      {/* <ApplicationForm /> */}
      <LoanInfo />
      <Footer />
    </div>
  );
}

export default App;
