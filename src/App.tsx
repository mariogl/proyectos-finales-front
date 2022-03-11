import ProjectsList from "./components/ProjectsList/ProjectsList";
import Navigation from "./components/Navigation/Navigation";
import { Col, Container, Row } from "react-bootstrap";

const App = () => {
  return (
    <>
      <Container fluid>
        <Row as="header">
          <h1>Proyectos finales</h1>
          <Navigation />
        </Row>
        <Row as="main">
          <Col xs={12}>
            <ProjectsList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
