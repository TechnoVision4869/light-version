import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import { AuthGuard } from "./components/auth/auth-guard";
import LoginPage from "./components/auth/login-page";
// import DashboardPage from "./components/dashboard/dashboard-page";
// import SettingsPage from "./components/settings/settings-page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* <Route path="/dashboard" element={<AuthGuard><DashboardPage /></AuthGuard>} /> */}
      {/* <Route path="/settings" element={<AuthGuard><SettingsPage /></AuthGuard>} /> */}
      <Route path="/home" element={<AuthGuard><Home /></AuthGuard>} />
    </Routes>
  );
}