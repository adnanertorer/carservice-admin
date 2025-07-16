import { AuthProvider } from "./core/auth/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./core/components/PrivateRoute";
import Layout from "./core/components/Layout";
import { CustomerList } from "./features/customers/components/CustomerList";
import LoginPage from "./pages/auth/login/login-page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomerVehicleList } from "./features/customer-vehicles/components/vehicle-list";
import { EmployeeList } from "./features/employees/components/employee-list";

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
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/:customerId/vehicles" element={<CustomerVehicleList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
