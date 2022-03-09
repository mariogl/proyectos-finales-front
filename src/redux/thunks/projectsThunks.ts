import axios from "axios";
import { Dispatch } from "react";
import { LoadProjectsAction } from "../../types/actions";
import Project from "../../types/project";
import loadProjectsAction from "../actions/projectsActionCreators";

export const loadProjectsThunk =
  () => async (dispatch: Dispatch<LoadProjectsAction>) => {
    const apiUrl = process.env.REACT_APP_API_URL as string;
    const { data } = await axios.get<Project[]>(apiUrl);

    dispatch(loadProjectsAction(data));
  };
