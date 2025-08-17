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
import { CreateCompanyForm } from "./features/auth/company-register/forms/create-company-form";
import { BookingPage } from "./pages/bookings/booking-page";
import LogoutPage from "./pages/auth/logout/logout-page";
import RegisterWithOtp from "./pages/auth/register-with-otp/register-with-otp-page";
import ResetPasswordRequestPage from "./pages/auth/reset-password-request/reset-password-request-page";
import ResetPasswordPage from "./pages/auth/reset-password/reset-password-page";
import { SettingsPage } from "./pages/settings/change-password-page";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/register-company" element={<CreateCompanyForm />} />
            <Route path="/opt-approve" element={<RegisterWithOtp />} />
            <Route path="/reset-password-request" element={<ResetPasswordRequestPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
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
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
