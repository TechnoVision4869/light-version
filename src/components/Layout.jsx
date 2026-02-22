import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import TECHNO_LOGO from "../assets/techno.png";
import { DATA } from '../data/layers';
import { useAuth } from './hooks/use-auth';

export default function Layout({ children, backgroundImage }) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const allMenuItems = [
    { label: 'Dashboard', path: '/admin', icon: 'dashboard' },
    { label: 'Projects', path: '/', icon: 'projects' },
    { label: 'Users', path: '/users', icon: 'users' },
  ];

  // Filter menu items based on user role
  const menuItems = allMenuItems.filter(item => {
    // Hide Users page for developer_marketing and developer_sales roles
    if (item.path === '/users' && (user?.role === 'developer_marketing' || user?.role === 'developer_sales')) {
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
      case 'dashboard':
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
      case 'projects':
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
      case 'users':
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
      className="min-h-screen text-white"
      style={{
        backgroundColor: backgroundImage ? 'transparent' : '#434343',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: backgroundImage ? 'cover' : 'auto',
        backgroundPosition: backgroundImage ? 'center' : 'auto',
        backgroundAttachment: backgroundImage ? 'fixed' : 'auto',
      }}
    >
      <Toaster position="top-center" />

      {/* Hamburger Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-6 left-6 z-30 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
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

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed left-0 top-0 h-screen w-52 sm:w-64 bg-[#1C1C1C] shadow-2xl z-25 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <nav className="flex flex-col gap-2 flex-1 mt-20">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${
                  isCurrentPage(item.path)
                    ? 'bg-white/20 text-white'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {renderIcon(item.icon)}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Techno Logo - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-20">
        <img
          src={TECHNO_LOGO}
          alt="Techno Vision Logo"
          className="w-16 xl:w-20 h-auto"
        />
      </div>

      {/* Main Content - Centered */}
      <div className="w-full min-h-screen flex items-center justify-center px-4 pt-20 pb-4 sm:pt-6">
        <div className="max-w-6xl w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
