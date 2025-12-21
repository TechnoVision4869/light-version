// ProjectState.js
let currentProject = null; // or null, or read from URL

export const getProject = () => currentProject;
export const setProject = (project) => { currentProject = project; };
