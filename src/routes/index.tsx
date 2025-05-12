// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import AdminRegisterPage from "../pages/AdminRegister";
import AdminLoginPage from "../pages/AdminLogin";
import RegisterMosquePage from "../pages/RegisterMosque";
import UnderReviewPage from "../pages/UnderReviewPage";
import ProfileSetupPage from "../pages/ProfileSetupPage";
import DashboardPage from "../pages/Dashboard";
import NotFoundPage from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Admin Auth */}
      <Route path="/admin/register" element={<AdminRegisterPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected flows */}
      <Route path="/register-mosque" element={<RegisterMosquePage />} />
      <Route path="/under-review" element={<UnderReviewPage />} />
      <Route path="/setup-profile" element={<ProfileSetupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
