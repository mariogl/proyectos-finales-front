import axios from "axios";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import {
  CreateProjectAction,
  DeleteProjectAction,
  LoadProjectsAction,
} from "../../types/actions";
import Project from "../../types/project";
import {
  createProjectAction,
  deleteProjectAction,
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
    return new Promise<void>(async (resolve, reject) => {
      const apiUrl = `${process.env.REACT_APP_API_URL}projects`;
      const { data } = await axios.post<{ project: Project }>(apiUrl, project, {
        headers: {
          authorization: `Bearer ${process.env.REACT_APP_TEMPORARY_JWT}`,
        },
      });
      dispatch(createProjectAction(data.project));
      resolve();
    });
  };

export const deleteProjectThunk =
  (id: string, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<DeleteProjectAction>) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}projects/${id}`;
    const { status } = await axios.delete(apiUrl, {
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_TEMPORARY_JWT}`,
      },
    });
    if (status === 200) {
      dispatch(deleteProjectAction(id));
      navigate("/projects");
    }
  };
