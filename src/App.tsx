import Navigation from "./components/Navigation/Navigation";
import { Col, Container, Row } from "react-bootstrap";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import ProjectsListPage from "./pages/ProjectsListPage/ProjectsListPage";
import FormProjectPage from "./pages/FormProjectPage/FormProjectPage";

const App = () => {
  return (
    <>
      <Container fluid>
        <Row as="header">
          <h1>
            Proyectos finales <Link to="/projects/new">➕</Link>{" "}
            <Link to="/projects">➖</Link>
          </h1>
          <Navigation />
        </Row>
        <Row as="main">
          <Col xs={12}>
            <Routes>
              <Route path="/projects" element={<ProjectsListPage />} />
              <Route path="/projects/new" element={<FormProjectPage />} />
              <Route path="/" element={<Navigate to="/projects" />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
