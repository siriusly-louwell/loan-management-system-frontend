import React from "react";
import { Route, Routes } from "react-router-dom";
import PageLayout from "../pages/PageLayout";
import ApplicantNav from "../components/navigations/ApplicantNav";
import ProductList from "../pages/ProductList";
import UnitsAll from "../pages/UnitsAll";
import UnitsNew from "../pages/UnitsNew";
import AppNotifications from "../components/modals/AppNotifications";
import InvoiceList from "../pages/InvoiceList";
import LoanInfo from "../pages/LoanInfo";
import CustomBttn from "../components/buttons/CustomBttn";
import Invoice from "../pages/Invoice";
import Profile from "../pages/Profile";
import EMICalculator from "../pages/EMICalculator";
import ProductInfo from "../pages/ProductInfo";
import ApplicationForm from "../pages/ApplicationForm";
import TransactionForm from "../pages/TransactionForm";
import TransactionFormat from "../components/TransactionFormat";
import PersonalInfoForm from "../pages/PersonalInfoForm";
import EmploymentInfoForm from "../pages/EmploymentInfoForm";
import FamilyInfoForm from "../pages/FamilyInfoForm";
import FormRequirements from "../pages/FormRequirements";
import ComakerInfo from "../pages/ComakerInfo";
import ProtectedRoute from "../components/ProtectedRoute";

export default function CustomerRoutes({ log }) {
  return (
    <Routes>
      <Route
        path="/customer"
        element={
          <PageLayout links={<ApplicantNav />} img={log.pfp} path="/customer" />
        }>
        {/* <Route index element={<ProductList url="/customer/product" />} /> */}
        <Route
          path=""
          element={
            <ProtectedRoute>
              <ProductList url="/customer/product" />
            </ProtectedRoute>
          }>
          <Route
            index
            element={
              <ProtectedRoute>
                <UnitsAll />
              </ProtectedRoute>
            }
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <UnitsNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="top"
            element={
              <ProtectedRoute>
                <UnitsNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="repo"
            element={
              <ProtectedRoute>
                <UnitsNew />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="prodlist"
          element={
            <ProtectedRoute>
              <ProductList url="/customer/product" />
            </ProtectedRoute>
          }>
          <Route
            index
            element={
              <ProtectedRoute>
                <UnitsAll />
              </ProtectedRoute>
            }
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <UnitsNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="top"
            element={
              <ProtectedRoute>
                <UnitsNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="repo"
            element={
              <ProtectedRoute>
                <UnitsNew />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* <Route path="prodlist" element={<ProductList url="/customer/product" />} /> */}
        <Route
          path="history"
          element={
            <ProtectedRoute>
              <AppNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="myloans"
          element={
            <ProtectedRoute>
              <InvoiceList
                id={log.id}
                headText="Loan Applications"
                path="/customer/loan"
                record={`/${log.id}?by=user_id`}
              />
            </ProtectedRoute>
          }
        />
        {/* <Route path="myloans" element={<InvoiceList id={log.id} headText="My Loans" />} /> */}
        <Route
          path="loan"
          element={
            <ProtectedRoute>
              <LoanInfo>
                <CustomBttn
                  text="Cancel Application"
                  className="flex items-center w-full justify-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-red-600 dark:border-red-500 dark:text-red-200 dark:hover:text-white dark:hover:bg-red-800 dark:focus:ring-red-900"
                />
              </LoanInfo>
            </ProtectedRoute>
          }
        />
        <Route
          path="invoice"
          element={
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="calculate"
          element={
            <ProtectedRoute>
              <EMICalculator />
            </ProtectedRoute>
          }
        />
        <Route
          path="product"
          element={
            <ProtectedRoute>
              <ProductInfo />
            </ProtectedRoute>
          }
        />

        <Route
          path="apply"
          element={
            <ProtectedRoute>
              <ApplicationForm />
            </ProtectedRoute>
          }>
          <Route
            index
            element={
              <ProtectedRoute>
                <TransactionForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="transaction"
            element={
              <ProtectedRoute>
                <TransactionFormat />
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
          <Route
            path="comakerform"
            element={
              <ProtectedRoute>
                <ComakerInfo />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}
