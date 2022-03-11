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
