import { FilterProjectsAction, LoadProjectsAction } from "../../types/actions";
import Project from "../../types/project";
import actionTypes from "./actionTypes";

export const loadProjectsAction = (
  projects: Project[]
): LoadProjectsAction => ({
  type: actionTypes.load,
  projects,
});

export const filterProjectsAction = (filter = ""): FilterProjectsAction => ({
  type: actionTypes.filter,
  filter,
});
