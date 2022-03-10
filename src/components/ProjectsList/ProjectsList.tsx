import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
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
    <Row as="ul" className="list-unstyled">
      {projects.map((project: Project) => (
        <Col as="li" xs={3} sm={4} key={project.id}>
          <ProjectCard project={project} />
        </Col>
      ))}
    </Row>
  );
};

export default ProjectsList;
