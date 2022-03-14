import Navigation from "./components/Navigation/Navigation";
import { Col, Container, Row } from "react-bootstrap";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import ProjectsListPage from "./pages/ProjectsListPage/ProjectsListPage";
import FormProjectPage from "./pages/FormProjectPage/FormProjectPage";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  a {
    color: inherit;
    text-decoration: none;
    &.active {
      font-weight: bold;
    }
  }
`;

const App = () => {
  return (
    <>
      <Container fluid>
        <StyledHeader as="header">
          <Col as="h1" xs={10}>
            Proyectos finales
          </Col>
          <Col xs={2} className="text-end">
            <NavLink to="/projects" end>
              Lista
            </NavLink>{" "}
            <NavLink to="/projects/new">Nuevo</NavLink>
          </Col>
        </StyledHeader>
        <Row>
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
