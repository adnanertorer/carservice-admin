import { AuthProvider } from "./core/auth/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./core/components/PrivateRoute";
import Layout from "./core/components/Layout";
import { CustomerList } from "./features/customers/components/CustomerList";
import LoginPage from "./pages/auth/login/login-page";

function App() {
  return (
    <>
      <AuthProvider>
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
            <Route path="/customers" element={<CustomerList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
