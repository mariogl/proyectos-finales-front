import { act } from "react-dom/test-utils";
import { randomProjects } from "../../mocks/projects";
import { LoadProjectsAction } from "../../types/actions";
import Project from "../../types/project";
import actionTypes from "./actionTypes";
import loadProjectsAction from "./projectsActionCreators";

describe("Given a loadProjectsAction function", () => {
  describe("When it receives a list of projects", () => {
    test("Then it should return a load action with the list of projects", async () => {
      const projects: Project[] = randomProjects(2);

      const expectedAction: LoadProjectsAction = {
        type: actionTypes.load,
        projects,
      };

      const action = loadProjectsAction(projects);

      expect(action).toEqual(expectedAction);

      await act(() => Promise.resolve());
    });
  });
});
