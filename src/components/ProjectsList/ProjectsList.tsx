import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadProjectsThunk } from "../../redux/thunks/projectsThunks";
import Project from "../../types/project";
import RootState from "../../types/store";
import ProjectCard from "../ProjectCard/ProjectCard";

const colors = [
  "#d50158",
  "#8900a6",
  "#3330a3",
  "#0084d6",
  "#009baa",
  "#007e6b",
  "#009534",
  "#abb901",
  "#ffc100",
  "#ff7101",
  "#f92801",
];

const ProjectsList = (): JSX.Element => {
  const dispatch = useDispatch();
  const projects: Project[] = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    dispatch(loadProjectsThunk());
  }, [dispatch]);

  return (
    <Row as="ul" className="list-unstyled">
      {projects.map((project: Project, i: number) => (
        <Col
          as="li"
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={project.id}
          className="container-card"
        >
          <ProjectCard project={project} backgroundColor={colors[i]} />
        </Col>
      ))}
    </Row>
  );
};

export default ProjectsList;
