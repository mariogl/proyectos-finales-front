import { screen } from "@testing-library/react";
import customRender from "../../testUtils";
import ProjectsList from "./ProjectsList";

describe("Given a ProjectList component", () => {
  describe("When it's rendered", () => {
    test("Then it should show three projects", async () => {
      customRender(<ProjectsList />);

      const projects = await screen.findAllByRole("listitem");

      expect(projects).toHaveLength(3);
    });
  });
});
