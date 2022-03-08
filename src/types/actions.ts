import Project from "./project";

interface LoadProjectsAction {
  type: string;
  projects: Project[];
}

export default LoadProjectsAction;
