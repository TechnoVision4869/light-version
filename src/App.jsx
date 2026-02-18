import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { AuthGuard } from "./components/auth/auth-guard";
import LoginPage from "./components/auth/login-page";
import AdminDashboard from "./components/admin/AdminDashboard";
// AuthConsumer is no longer needed directly in App.jsx as App is rendered conditionally in main.jsx

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* Protected routes */}
      <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
      <Route path="/admin" element={<AuthGuard><AdminDashboard /></AuthGuard>} />
      {/* Add other protected routes here */}
    </Routes>
  );
}
