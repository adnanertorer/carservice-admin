import { AuthProvider } from "./core/auth/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./core/components/PrivateRoute";
import Layout from "./core/components/Layout";
import LoginPage from "./pages/auth/login/login-page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomerPage } from "./pages/customers/customer-page";
import { SupplierPage } from "./pages/suppliers/supplier-page";
import { EmployeePage } from "./pages/employees/employee-page";
import { CustomerVehiclePage } from "./pages/customer-vehicles/customer-vehicle-page";
import { MainServicePage } from "./pages/main-services/main-service-page";
import { SubServicePage } from "./pages/sub-services/sub-service-page";
import { AccountTransactionPage } from "./pages/account-transactions/account-transaction-page";
import { CustomerDebtPage } from "./pages/customer-debts/customer-debt-page";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
            <Route path="/employees" element={<EmployeePage />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/customers/:customerId/vehicles" element={<CustomerVehiclePage />} />
            <Route path="/suppliers" element={<SupplierPage />} />
            <Route path="/main-services" element={<MainServicePage />} />
            <Route path="/main-services/:id/sub-services" element={<SubServicePage />} />
            <Route path="/account-transactions" element={<AccountTransactionPage />} />
            <Route path="/customer-transactions/:id" element={<CustomerDebtPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
