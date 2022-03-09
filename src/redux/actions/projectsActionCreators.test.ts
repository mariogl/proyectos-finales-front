import { LoadProjectsAction } from "../../types/actions";
import Project from "../../types/project";
import actionTypes from "./actionTypes";
import loadProjectsAction from "./projectsActionCreators";

describe("Given a loadProjectsAction function", () => {
  describe("When it receives a list of projects", () => {
    test("Then it should return a load action with the list of projects", () => {
      const projects: Project[] = [
        {
          id: "1",
          name: "Project 1",
          student: "Student 1",
          repo: {
            back: "",
            front: "",
          },
        },
        {
          id: "2",
          name: "Project 2",
          student: "Student 2",
          repo: {
            back: "",
            front: "",
          },
        },
      ];

      const expectedAction: LoadProjectsAction = {
        type: actionTypes.load,
        projects,
      };

      const action = loadProjectsAction(projects);

      expect(action).toEqual(expectedAction);
    });
  });
});
