import Project from "./project";

export interface Action {
  type: string;
}
export interface LoadProjectsAction extends Action {
  projects: Project[];
}

export interface FilterProjectsAction extends Action {
  filter: string;
}

export interface CreateProjectAction extends Action {
  project: Project;
}

export interface DeleteProjectAction extends Action {
  id: string;
}
