import { render, screen } from "@testing-library/react";
import { randomProject } from "../../mocks/projects";
import ProjectCard from "./ProjectCard";

describe("Given a ProjectCard component", () => {
  describe("When it receives a project", () => {
    test("Then it should display its name and student", () => {
      const project = randomProject();

      render(<ProjectCard project={project} />);

      const name = screen.queryByRole("heading", { name: project.name });
      const student = screen.queryByText(project.student);

      expect(name).toBeInTheDocument();
      expect(student).toBeInTheDocument();
    });
  });
});
