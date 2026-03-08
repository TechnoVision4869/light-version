import { useEffect, useState } from "react";
import { projectApi } from "../api/admin/projectApi";
import { APP_CONFIG } from "../config/appConfig";
import Layout from "./Layout";
import { useAuth } from "./hooks/use-auth";
import toast from "react-hot-toast";
import { developerApi } from "@/api/admin/developerApi";
import { assetApi } from "../api/admin/assetApi";
import { DATA } from "../data/layers";
import { fetchProjectById } from "../lib/projectFetcher";

export default function ProjectSelector({
  developerId,
  onProjectSelect,
  onBackButtonClick,
}) {
  const useMockup = APP_CONFIG.USE_MOCKUP;
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [developerAssets, setDeveloperAssets] = useState({
    backgroundImage: null,
    logoImage: null,
  });
  const [thumbnailUrls, setThumbnailUrls] = useState({});
  const [introVideoUrls, setIntroVideoUrls] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      if (useMockup) {
        // Load from mock data
        const mockProjects = DATA.developerProjects || [];
        setProjects(mockProjects);

        // Build mock thumbnail and intro video URLs
        const thumbnails = {};
        const introVideos = {};

        mockProjects.forEach((project) => {
          if (project.thumbnail) {
            thumbnails[project.id] = project.thumbnail;
          }
          if (project.introVideo) {
            introVideos[project.id] = project.introVideo;
          }
        });

        setThumbnailUrls(thumbnails);
        setIntroVideoUrls(introVideos);
      } else {
        // Load from API
        const response = await projectApi.getByDeveloper(developerId);

        // Check if response is valid before proceeding
        if (!response || !Array.isArray(response) || response.length === 0) {
          setProjects([]);
          setLoading(false);
          return;
        }

        setProjects(response);

        // Fetch thumbnails and intro videos for all projects
        const thumbnails = {};
        const introVideos = {};

        for (const project of response) {
          // Fetch thumbnail
          if (project.thumbnailAssetId) {
            try {
              const url = await assetApi.getAssetFileUrl(
                project.thumbnailAssetId,
              );
              if (url) {
                thumbnails[project.id] = url;
              }
            } catch (error) {
              console.error(
                `Failed to fetch thumbnail for project ${project.id}:`,
                error,
              );
            }
          }

          // Fetch intro video
          if (project.introAssetId) {
            try {
              const url = await assetApi.getAssetFileUrl(project.introAssetId);
              if (url) {
                introVideos[project.id] = url;
              }
            } catch (error) {
              console.error(
                `Failed to fetch intro video for project ${project.id}:`,
                error,
              );
            }
          }
        }

        setThumbnailUrls(thumbnails);
        setIntroVideoUrls(introVideos);
      }
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
      if (useMockup) {
        // Load from mock data
        setDeveloperAssets({
          backgroundImage: DATA.backgroundImage || null,
          logoImage: DATA.developerLogo || null,
        });
      } else {
        // Load from API
        const developer = await developerApi.getById(developerId);
        if (developer?.backgroundImageAssetId) {
          const backgroundImg = await assetApi.getAssetFileUrl(
            developer.backgroundImageAssetId,
          );
          if (backgroundImg) {
            setDeveloperAssets((prev) => ({
              ...prev,
              backgroundImage: backgroundImg,
            }));
          } else {
            console.warn("Asset response missing URL:", backgroundImg);
            toast.error("Failed to load background image");
          }
        }
        if (developer?.logoAssetId) {
          const logoImg = await assetApi.getAssetFileUrl(developer.logoAssetId);
          if (logoImg) {
            setDeveloperAssets((prev) => ({ ...prev, logoImage: logoImg }));
          } else {
            console.warn("Asset response missing URL:", logoImg);
            toast.error("Failed to load logo image");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching developer assets:", error);
      if (!useMockup) {
        toast.error("Failed to load developer assets");
      }
    }
  };

  const fetchSelectedProject = async (projectId, introVideoUrl) => {
    try {
      const project = await fetchProjectById(projectId, useMockup);
      if (project) {
        onProjectSelect(project);
      } else {
        toast.error("Failed to load project details.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while loading project details.");
    }
  };

  useEffect(() => {
    if (useMockup || developerId) {
      fetchProjects();
      fetchDeveloperAssets();
    }
  }, [developerId, useMockup]);

  const showBackButton = [
    "admin",
    "system_admin",
    "system_technician",
  ].includes(user?.role);

  return (
    <Layout backgroundImage={developerAssets.backgroundImage} fullscreen={true}>
      <div
        className="w-full h-screen flex flex-col items-center justify-start pt-8"
        style={{
          backgroundImage: `url(${developerAssets.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="mb-8">
          <img
            src={developerAssets.logoImage}
            alt="Developer Logo"
            className="w-auto h-auto max-h-18 xl:max-h-22 xl:w-22 max-w-[90vw] xl:max-w-md"
          />
        </div>
        {showBackButton && onBackButtonClick && (
          <button
            onClick={onBackButtonClick}
            className="text-white text-sm font-medium hover:opacity-70 transition-opacity"
          >
            ← Back to Developers
          </button>
        )}
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
                const disabled = !introVideoUrls[project.id];
                return (
                  <div
                    key={project.id}
                    className="w-[300px] rounded-2xl overflow-hidden backdrop-blur-sm bg-[#1C1C1C8C]"
                  >
                    <div className="px-3 pt-3">
                      <img
                        src={thumbnailUrls[project.id]}
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
                        onClick={() =>
                          fetchSelectedProject(
                            project.id,
                            introVideoUrls[project.id],
                          )
                        }
                        disabled={disabled}
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
