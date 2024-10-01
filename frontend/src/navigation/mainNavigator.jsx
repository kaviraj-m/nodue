// src/navigation/MainNavigator.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import LoginPage from "../screens/loginPage";
import StudentDashboard from "../screens/student/studentDashboard";
import { AuthorityDashboard } from "../screens/authoritie/AuthoritieDashboard";
import COEDashboard from "../screens/coe/COEDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import AdminDashboard from "../screens/admin/admin";

export const MainNavigator = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/student-dashboard"
              element={<ProtectedRoute element={<StudentDashboard />} />}
            />
            <Route
              path="/authoritie-dashboard"
              element={<ProtectedRoute element={<AuthorityDashboard />} />}
            />
            <Route
              path="/coe-dashboard"
              element={<ProtectedRoute element={<COEDashboard />} />}
            />
            <Route
              path="/admin"
              element={<ProtectedRoute element={<AdminDashboard />} />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
};
