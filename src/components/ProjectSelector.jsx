import { DATA } from '../data/layers';
import { useEffect, useState } from 'react';
import { projectApi } from "../api/admin/projectApi";
import Layout from './Layout';

export default function ProjectSelector({ onProjectSelect }) {
  // const projects = DATA.developerProjects;
  const [projects, setProjects] = useState(DATA.developerProjects);

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

  return (
    <Layout backgroundImage={DATA.backgroundImage}>
      <div className="w-full h-screen flex flex-col items-center justify-start pt-8">
        <div className="mb-8">
          <img
            src={DATA.developerLogo}
            alt="Developer Logo"
            className="w-auto h-auto max-h-18 xl:max-h-22 xl:w-22 max-w-[90vw] xl:max-w-md"
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center w-full px-4">
          {projects.length === 0 ? (
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
