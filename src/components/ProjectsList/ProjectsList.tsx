import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProjectsThunk } from "../../redux/thunks/projectsThunks";
import Project from "../../types/project";
import RootState from "../../types/store";
import ProjectCard from "../ProjectCard/ProjectCard";

const ProjectsList = (): JSX.Element => {
  const dispatch = useDispatch();
  const projects: Project[] = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    dispatch(loadProjectsThunk());
  }, [dispatch]);

  return (
    <ul>
      {projects.map((project: Project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
};

export default ProjectsList;
