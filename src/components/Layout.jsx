import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TECHNO_LOGO from "../assets/techno.png";
import { useAuth } from "./hooks/use-auth";
import { APP_CONFIG } from "../config/appConfig";

export default function Layout({ children, backgroundImage, fullscreen = false, title = "", headerClassName = "bg-transparent", showHeader = true }) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const allMenuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { label: 'Projects', path: '/', icon: 'projects' },
    { label: 'Users', path: '/users', icon: 'users' },
  ];

  // Filter menu items based on user role
  // const menuItems = allMenuItems.filter((item) => {
  //   // Hide Users and Dashboard pages for developer_marketing and developer_sales roles
  //   if (
  //     (item.path === "/users" || item.path === "/dashboard") &&
  //     (user?.role === "developer_marketing" || user?.role === "developer_sales")
  //   ) {
  //     return false;
  //   }
  //   return true;
  // });

  const menuItems = allMenuItems.filter((item) => {
    // Hide Dashboard page for developer_marketing, developer_sales and developer_admin roles
    if (
      (item.path === "/dashboard") &&
      (user?.role === "developer_marketing" || user?.role === "developer_sales" || user?.role === "developer_admin")
    ) {
      return false;
    }
    return true;
  });

  const isCurrentPage = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const renderIcon = (iconType) => {
    switch (iconType) {
      case "dashboard":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4"
            />
          </svg>
        );
      case "projects":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
        );
      case "users":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{
        backgroundColor: backgroundImage ? "transparent" : "#434343",
      }}
    >

      {/* Header Bar */}
      {showHeader ? (
        <header className={`fixed top-0 left-0 right-0 h-14 z-40 ${headerClassName}`}>
          <div className="relative flex items-center justify-center h-full px-6">
            {!APP_CONFIG.USE_STATIC && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="absolute left-6 p-2 rounded-lg hover:bg-white/10 transition-colors shrink-0"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
            {title ? (
              <h1 className="text-xl font-semibold text-white text-center truncate max-w-full px-16">
                {title}
              </h1>
            ) : null}
          </div>
        </header>
      ) : (
        !APP_CONFIG.USE_STATIC && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed top-2 left-6 z-40 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )
      )}

      {!APP_CONFIG.USE_STATIC && (
        <>
          {/* Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-20"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar Menu */}
          <div
            className={`fixed left-0 ${showHeader ? 'top-14 h-[calc(100vh-3.5rem)]' : 'top-0 h-screen'} w-52 sm:w-64 bg-[#1C1C1C] shadow-2xl z-25 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-6 flex flex-col h-full">
              <nav className={`flex flex-col gap-2 flex-1 ${showHeader ? 'mt-4' : 'mt-18'}`}>
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${
                      isCurrentPage(item.path)
                        ? "bg-white/20 text-white"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {renderIcon(item.icon)}
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="w-full px-4 py-3 rounded-lg font-medium transition-colors text-white hover:bg-red-600/20 flex items-center gap-3"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </>
      )}

      {/* Techno Logo - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-20">
        <img
          src={TECHNO_LOGO}
          alt="Techno Vision Logo"
          className="w-16 xl:w-20 h-auto"
        />
      </div>

      {/* Main Content */}
      <div className={`w-full ${showHeader ? 'pt-14' : ''} ${fullscreen ? '' : 'px-4 pb-4 sm:pb-6'}`}>
        <div
          className={fullscreen ? `w-full ${showHeader ? 'h-[calc(100vh-3.5rem)]' : 'h-screen'}` : 'max-w-6xl w-full min-h-[calc(100vh-3.5rem)] mx-auto flex items-center justify-center'}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
