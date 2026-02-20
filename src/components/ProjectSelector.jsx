import TECHNO_LOGO from "../assets/techno.png";
import { DATA } from '../data/layers';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { projectApi } from "../api/admin/projectApi";

export default function ProjectSelector({ onProjectSelect }) {
  // const projects = DATA.developerProjects;
  const [projects, setProjects] = useState(DATA.developerProjects);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await projectApi.getByDeveloper(
        "07c2b2bb-cfe6-4419-9c1b-c65d926e2717",
      );
      setProjects(response);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    // fetchProjects();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${DATA.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-8 left-6 z-30 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
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
        className={`fixed left-0 top-0 h-screen w-64 bg-[#1C1C1C] shadow-2xl z-25 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <nav className="flex flex-col gap-4 flex-1 mt-20">
            <button
              onClick={() => handleNavigation("/dashboard")}
              className="w-full text-left px-4 py-3 rounded-lg text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-3"
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
                  d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4"
                />
              </svg>
              Dashboard
            </button>

            <button
              onClick={() => handleNavigation("/users")}
              className="w-full text-left px-4 py-3 rounded-lg text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-3"
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
                  d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Users
            </button>
          </nav>
        </div>
      </div>
      <div className="absolute top-8 xl:top-12 left-1/2 -translate-x-1/2 z-20">
        <img
          src={DATA.developerLogo}
          alt="Developer Logo"
          className="w-auto h-auto max-h-18 xl:max-h-22 xl:w-22 max-w-[90vw] xl:max-w-md"
        />
      </div>
      <div className="absolute bottom-6 right-6 z-20">
        <img
          src={TECHNO_LOGO}
          alt="Techno Vision Logo"
          className="w-19 xl:w-24 h-auto"
        />
      </div>
      <div className="max-w-4xl xl:max-w-5xl w-full mx-auto relative z-10">
        {projects.length === 0 ? (
          <div className="w-full rounded-2xl overflow-hidden backdrop-blur-sm bg-[#1C1C1C8C]">
            <div className="p-8 flex flex-col items-center justify-center text-center">
              <h2 className="tracking-wide text-2xl font-semibold text-white mb-3">
                No Projects Available
              </h2>
              <p className="text-[#DADADA] text-sm mb-6">
                There are currently no projects to display. Go to{" "}
                <button
                  onClick={() => navigate("/dashboard")}
                  className="text-white font-semibold hover:underline transition-all"
                >
                  Dashboard
                </button>{" "}
                to add a new project.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-8 xl:gap-10 justify-center">
            {projects.map((project) => {
              const disabled = !project.introVideo;
              return (
                // Added w-[300px] to constrain card width so it doesn't stretch
                <div
                  key={project.id}
                  className="w-[300px] rounded-2xl overflow-hidden backdrop-blur-sm bg-[#1C1C1C8C]"
                >
                  <div className="px-3 pt-3">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="rounded-2xl w-full h-auto object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h2 className="tracking-wide text-lg font-semibold text-white mb-1">
                      {project.name}
                    </h2>
                    <p className="text-[#DADADA] text-[11px] mb-4">
                      {project.description}
                    </p>

                    <button
                      onClick={() => onProjectSelect(project)}
                      disabled={!project.introVideo}
                      className={`w-full py-2 px-4 bg-transparent border ${disabled ? "" : "hover:bg-white hover:text-black hover:border-white"} disabled:text-white/50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors duration-300`}
                    >
                      {disabled ? "Coming Soon" : "Open Project"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
