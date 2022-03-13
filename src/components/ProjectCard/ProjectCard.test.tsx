import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { randomProject } from "../../factories/project";
import ProjectCard from "./ProjectCard";

describe("Given a ProjectCard component", () => {
  describe("When it receives a project", () => {
    test("Then it should display its name and student", async () => {
      const project = randomProject();

      render(<ProjectCard project={project} backgroundColor="#000" />);

      const name = await screen.findByRole("heading", {
        name: project.name,
      });

      expect(name).toBeInTheDocument();

      await act(() => Promise.resolve());
    });
  });
});
