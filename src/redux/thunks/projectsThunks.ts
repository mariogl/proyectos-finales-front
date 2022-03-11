import axios from "axios";
import { Dispatch } from "react";
import { LoadProjectsAction } from "../../types/actions";
import Project from "../../types/project";
import { loadProjectsAction } from "../actions/projectsActionCreators";

export const loadProjectsThunk =
  () => async (dispatch: Dispatch<LoadProjectsAction>) => {
    const apiUrl = process.env.REACT_APP_API_URL as string;
    const { data } = await axios.get<{ projects: Project[] }>(apiUrl, {
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjQ2ZTQzYThlZDBmY2FmZDE5NDZmYiIsIm5hbWUiOiJNYXJpbyIsImlhdCI6MTY0Njg1MzQ3NCwiZXhwIjoxNjQ3MDI2Mjc0fQ.ZMSi38Zx7x5GpsmLsrfDZepsfMP-Hy9hfK9dNRNn1gU",
      },
    });
    dispatch(loadProjectsAction(data.projects));
  };
