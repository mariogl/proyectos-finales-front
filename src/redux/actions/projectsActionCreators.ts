import LoadProjectsAction from "../../types/actions";
import Project from "../../types/project";
import actionTypes from "./actionTypes";

const loadProjectsAction = (projects: Project[]): LoadProjectsAction => ({
  type: actionTypes.load,
  projects,
});

export default loadProjectsAction;
