import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { randomProject } from "../../mocks/projects";
import ProjectCard from "./ProjectCard";

describe("Given a ProjectCard component", () => {
  describe("When it receives a project", () => {
    test("Then it should display its name and student", async () => {
      const project = randomProject();

      render(<ProjectCard project={project} />);

      const name = await screen.findByRole("heading", {
        name: project.name + " - " + project.student,
      });

      expect(name).toBeInTheDocument();

      await act(() => Promise.resolve());
    });
  });
});
