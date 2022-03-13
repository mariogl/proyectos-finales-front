import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

interface Tutor {
  id: string;
  name: string;
}

const FormProject = (): JSX.Element => {
  const [tutors, setTutors] = useState<Tutor[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get<Tutor[]>(
        `${process.env.REACT_APP_API_URL}users`,
        {
          headers: {
            authorization: `Bearer ${process.env.REACT_APP_TEMPORARY_JWT}`,
          },
        }
      );
      setTutors(data);
    })();
  }, []);

  return (
    <Form noValidate autoComplete="off">
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre del proyecto</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="student">
            <Form.Label>Nombre del alumno</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Carpeta</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="student">
            <Form.Label>Key SonarQube</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Repo front</Form.Label>
            <Form.Control type="url" />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="student">
            <Form.Label>Repo back</Form.Label>
            <Form.Control type="url" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Trello</Form.Label>
            <Form.Control type="url" />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="student">
            <Form.Label>Tutor</Form.Label>
            <Form.Select>
              <option>Elige tutor</option>
              {tutors.map((tutor) => (
                <option key={tutor.id} value={tutor.id}>
                  {tutor.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Button type="submit" variant="dark">
            Create
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormProject;
