import { useCallback, useEffect, useRef, useState } from "react";
import { projectApi } from "../api/admin/projectApi";
import { APP_CONFIG } from "../config/appConfig";
import Layout from "./Layout";
import { useAuth } from "./hooks/use-auth";
import toast from "react-hot-toast";
import { developerApi } from "@/api/admin/developerApi";
import { assetApi } from "../api/admin/assetApi";
import { DATA, PATH } from "../data/layers";
import { fetchProjectById } from "../lib/projectFetcher";
import { prefetchSingleUrl } from "../lib/enrichProjectData";
import { setCachedDeveloperLogo } from "../lib/developerLogoCache";
import DownloadTestOverlay from "./DownloadTestOverlay";

const DEFAULT_LOGO = '/default-logo.png';
const projectPath = PATH;
const PROJECT_HIGHLIGHT = `/${projectPath}/images/project-highlight.png`;

export default function ProjectSelector({
  developerId,
  onProjectSelect,
  onBackButtonClick,
}) {
  const useStatic = APP_CONFIG.USE_STATIC;
  const usePredefinedPos = APP_CONFIG.USE_PREDEFINED_POS;
  const predefinedPos = {x: 0.42, y: 0.4};
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [developerAssets, setDeveloperAssets] = useState({
    backgroundImage: null,
    logoImage: null,
  });
  const [thumbnailUrls, setThumbnailUrls] = useState({});
  const [introVideoUrls, setIntroVideoUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [pressedProjectId, setPressedProjectId] = useState(null);

  const containerRef = useRef(null);
  const projectPressTimeoutRef = useRef(null);
  const [predefinedPixelPos, setPredefinedPixelPos] = useState({ left: 0, top: 0 });
  const [isProjectHovered, setIsProjectHovered] = useState(false);

  const updatePredefinedPos = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    const videoW = h * (16 / 9);
    const videoLeft = (w - videoW) / 2;
    setPredefinedPixelPos({
      left: videoLeft + videoW * predefinedPos.x,
      top: h * predefinedPos.y,
    });
  }, []);

  useEffect(() => {
    if (!usePredefinedPos) return;
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(updatePredefinedPos);
    ro.observe(container);
    updatePredefinedPos();
    return () => ro.disconnect();
  }, [usePredefinedPos, updatePredefinedPos]);
  
  const fetchProjects = async () => {
    console.log("Fetching projects...");
    try {
      setLoading(true);
      
      if (useStatic) {
        // Load from static data
        const staticProjects = DATA.developerProjects || [];
        setProjects(staticProjects);

        // Build static thumbnail and intro video URLs
        const thumbnails = {};
        const introVideos = {};

        staticProjects.forEach((project) => {          
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

          // Fetch project intro video
          if (project.introAssetId) {
            try {
              const url = await assetApi.getAssetFileUrl(project.introAssetId);
              if (url) {
                introVideos[project.id] = url;
                // Load and cache the video in the service worker
                prefetchSingleUrl(url);
              }
            } catch (error) {
              console.error(
                `Failed to fetch intro video for project ${project.id}:`,
                error,
              );
            }
          }

          // Fetch project idle video
          if (project.idleAssetId) {
            try {
              const url = await assetApi.getAssetFileUrl(project.idleAssetId);
              if (url) {
                // Load and cache the video in the service worker
                prefetchSingleUrl(url);
              }
            } catch (error) {
              console.error(
                `Failed to fetch idle video for project ${project.id}:`,
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
      if (useStatic) {
        // Load from static data
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
            // Save it so other places that need the developer logo later (e.g. the unit
            // brochure PDF) can reuse it instead of re-fetching it themselves.
            setCachedDeveloperLogo(developerId, logoImg);
          } else {
            console.warn("Asset response missing URL:", logoImg);
            toast.error("Failed to load logo image");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching developer assets:", error);
      if (!useStatic) {
        toast.error("Failed to load developer assets");
      }
    }
  };

  const fetchSelectedProject = async (projectId, introVideoUrl) => {
    try {
      const project = await fetchProjectById(projectId, useStatic);
      if (project) {
        onProjectSelect(project, introVideoUrl, developerId);
      } else {
        toast.error("Failed to load project details.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while loading project details.");
    }
  };

  const handleProjectPress = (projectId, introVideoUrl) => {
    if (projectPressTimeoutRef.current) {
      clearTimeout(projectPressTimeoutRef.current);
      projectPressTimeoutRef.current = null;
    }

    setPressedProjectId(projectId);
    setIsProjectHovered(true);

    projectPressTimeoutRef.current = setTimeout(() => {
      fetchSelectedProject(projectId, introVideoUrl);
      // Keep button pressed while splash loads and plays
      // Will unmount naturally when navigating to /home
      projectPressTimeoutRef.current = null;
    }, 200);
  };

  useEffect(() => {
    if (useStatic || developerId) {
      fetchProjects();
      fetchDeveloperAssets();
    }
  }, [developerId, useStatic]);

  useEffect(() => {
    return () => {
      if (projectPressTimeoutRef.current) {
        clearTimeout(projectPressTimeoutRef.current);
      }
    };
  }, []);

  const showBackButton = [
    "admin",
    "system_admin",
    "system_technician",
  ].includes(user?.role);

  return (
    <Layout backgroundImage={developerAssets.backgroundImage} fullscreen={true} showHeader={false}>
      {!useStatic && !loading && projects.length > 0 && (
        <DownloadTestOverlay projects={projects} developerId={developerId} useStatic={useStatic} />
      )}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
      >
        {/* Background image */}
        {developerAssets.backgroundImage && (
          <img
            src={developerAssets.backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Project highlight overlay — same cover sizing = pixel-perfect match */}
        {usePredefinedPos && !loading && projects.length > 0 && (
          projects.map((project) => {
            return (
              <img
              key={project.id}
              src={thumbnailUrls[project.id]}
              alt=""
              id={`highlight-${project.id}`}
              className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${isProjectHovered ? 'opacity-70' : 'opacity-100'}`}
            />
            )
          })
        )}

        {/* UI content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-8">
          {/* {developerAssets.logoImage &&
          <div className="mb-8">
            <img
              src={developerAssets.logoImage}
              alt="Developer Logo"
              className="w-auto h-auto max-h-28 xl:max-h-32 xl:w-32 max-w-[90vw] xl:max-w-md"
            />
          </div>
          } */}
          {showBackButton && !useStatic && onBackButtonClick && (
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
            ) : usePredefinedPos ? (
              <>
                {projects.map((project) => {
                  const disabled = !introVideoUrls[project.id];
                  const isPressed = pressedProjectId === project.id;
                  return (
                    <button
                      key={project.id}
                      disabled={disabled}
                      className="absolute rounded-2xl overflow-hidden backdrop-blur-sm bg-[#00000066]
                       text-white py-2 px-4 text-xl
                       hover:bg-[#4a6082] hover:scale-105 disabled:bg-[00000044] disabled:text-white/50 disabled:cursor-not-allowed transition-all duration-500"
                      onClick={() => handleProjectPress(project.id, introVideoUrls[project.id])}
                      onMouseEnter={() => !disabled && setIsProjectHovered(true)}
                      onMouseLeave={() => setIsProjectHovered(false)}
                      style={
                        isPressed
                          ? {
                              left: `${predefinedPixelPos.left}px`,
                              top: `${predefinedPixelPos.top}px`,
                              backgroundColor: "#4a6082",
                              transform: "scale(1.05)",
                            }
                          : {
                              left: `${predefinedPixelPos.left}px`,
                              top: `${predefinedPixelPos.top}px`,
                            }
                      }
                      >
                         {<span className='whitespace-nowrap'>{disabled ? "Coming Soon" : project.name}</span>}
                    </button>
                      
                  );
                })}
              </>
            ) : (
            <div className="flex flex-wrap gap-8 xl:gap-10 justify-center">
              {projects.map((project) => {
                const disabled = !introVideoUrls[project.id];
                const isPressed = pressedProjectId === project.id;
                return (
                  <div
                    key={project.id}
                    className="w-[300px] rounded-2xl overflow-hidden backdrop-blur-sm bg-[#1C1C1C8C]"
                  >
                    {thumbnailUrls[project.id] &&
                    <div className="px-3 pt-3">
                      <img
                        src={thumbnailUrls[project.id]}
                        alt={project.name}
                        className="rounded-2xl w-full h-auto object-cover"
                      />
                    </div>}

                    <div className="p-4">
                      <h2 className="tracking-wide text-lg font-semibold text-white mb-1">
                        {project.name}
                      </h2>
                      <p className="text-[#DADADA] text-[11px] mb-4">
                        {project.description}
                      </p>

                      <button
                        onClick={() => handleProjectPress(project.id, introVideoUrls[project.id])}
                        disabled={disabled}
                        className={`w-full py-2 px-4 bg-transparent border
                          ${disabled ? "" : "hover:bg-white hover:text-black hover:font-bold hover:border-white"} hover:scale-102
                          disabled:text-white/50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-300`}
                        onMouseEnter={() => !disabled && setIsProjectHovered(true)}
                        onMouseLeave={() => setIsProjectHovered(false)}
                        style={
                          isPressed
                            ? {
                                backgroundColor: "white",
                                color: "black",
                                fontWeight: "bold",
                                transform: "scale(1.02)",
                              }
                            : {}
                        }
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
      </div>
    </Layout>
  );
}
