import axios from "axios";
import { Dispatch } from "react";
import { CreateProjectAction, LoadProjectsAction } from "../../types/actions";
import Project from "../../types/project";
import {
  createProjectAction,
  loadProjectsAction,
} from "../actions/projectsActionCreators";

export const loadProjectsThunk =
  () => async (dispatch: Dispatch<LoadProjectsAction>) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}projects`;
    const { data } = await axios.get<{ projects: Project[] }>(apiUrl, {
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_TEMPORARY_JWT}`,
      },
    });
    dispatch(loadProjectsAction(data.projects));
  };

export const createProjectThunk =
  (project: Project) => async (dispatch: Dispatch<CreateProjectAction>) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}projects`;
    const { data } = await axios.post<Project>(apiUrl, project, {
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_TEMPORARY_JWT}`,
      },
    });
    dispatch(createProjectAction(data));
  };
