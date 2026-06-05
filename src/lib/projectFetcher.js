import { projectApi } from "../api/admin/projectApi";
import { DATA } from "../data/layers";

/**
 * Fetch a project by ID from either mock data or API
 * @param {string} projectId - The project ID to fetch
 * @param {boolean} useMockup - Whether to use mock data or actual API
 * @returns {Promise<Object|null>} - The project object or null if not found
 */
export const fetchProjectById = async (projectId, useMockup) => {
    let project;
    
    if (useMockup) {
        project = DATA.developerProjects?.find(p => p.id === projectId);
    } else {
        const response = await projectApi.getById(projectId);
        if (response?.developerProjects?.[0]) {
            project = { ...response.developerProjects[0], id: projectId };
        }
        // console.log("response:", response);
    }
    return project;
};
