import { useEffect, useState } from 'react';
import { projectApi } from "../api/admin/projectApi";
import Layout from './Layout';
import { useAuth } from './hooks/use-auth';
import toast from 'react-hot-toast';
import { developerApi } from '@/api/admin/developerApi';
import { assetsApi } from '@/api/assetsApi';

export default function ProjectSelector({ developerId, onProjectSelect, onBackButtonClick }) {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectApi.getByDeveloper(developerId);
      setProjects(response);

      await fetchDeveloperAssets();
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeveloperAssets = async () => {
    try {
      const developer = await developerApi.getById(developerId);
      if (developer?.backgroundImageAssetId) {
        const response = await assetsApi.getAsset(developer.backgroundImageAssetId);
        console.log(response);
        
        setBackgroundImage(response.url);
      }
    } catch (error) {
      console.error("Error fetching developer assets:", error);
    }
  };

  useEffect(() => {
    if (developerId) {
      fetchProjects();
    }
  }, [developerId]);

  const showBackButton = ['admin', 'system_admin', 'system_technician'].includes(user?.role);

  return (
    <Layout backgroundImage={backgroundImage}>

      <div
        className="w-full h-screen flex flex-col items-center justify-start pt-8"
        style={backgroundImage ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        } : {
          backgroundColor: "#488343",
        }}
      >
        {showBackButton && onBackButtonClick && (
          <button
            onClick={onBackButtonClick}
            className="mb-4 text-white text-sm font-medium hover:opacity-70 transition-opacity"
          >
            ← Back to Developers
          </button>
        )}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Select Project
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center w-full px-4">
          {loading ? (
            <div className="text-white text-lg">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="w-full rounded-2xl overflow-hidden backdrop-blur-sm bg-[#1C1C1C8C]">
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <h2 className="tracking-wide text-2xl font-semibold text-white mb-3">
                  No Projects Available
                </h2>
                <p className="text-[#DADADA] text-sm mb-6">
                  There are currently no projects to display.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-8 xl:gap-10 justify-center">
              {projects.map((project) => {
                const disabled = !project.introVideo;
                return (
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
    </Layout>
  );
}
