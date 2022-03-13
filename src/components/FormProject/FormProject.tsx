import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { blankProject } from "../../factories/project";
import Project from "../../types/project";

interface Tutor {
  id: string;
  name: string;
}

const FormProject = (): JSX.Element => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const initialData: Project = blankProject();

  const [formData, setFormData] = useState<Project>(initialData);

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

  const changeData = (event: ChangeEvent) => {
    event.preventDefault();
    const value = (event.target as HTMLInputElement).value;
    if (event.target.id.includes(".")) {
      const [parentKey, childKey] = event.target.id.split(".");
      setFormData({
        ...formData,
        [parentKey]: {
          ...(formData[parentKey as keyof Project] as object),
          [childKey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [event.target.id]: value,
      });
    }
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <Form noValidate autoComplete="off" onSubmit={submitForm}>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre del proyecto</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={changeData}
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="student">
            <Form.Label>Nombre del alumno</Form.Label>
            <Form.Control
              type="text"
              value={formData.student}
              onChange={changeData}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="folder">
            <Form.Label>Carpeta</Form.Label>
            <Form.Control
              type="text"
              value={formData.folder}
              onChange={changeData}
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="sonarqubeKey">
            <Form.Label>Key SonarQube</Form.Label>
            <Form.Control
              type="text"
              value={formData.sonarqubeKey}
              onChange={changeData}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="repo.front">
            <Form.Label>Repo front</Form.Label>
            <Form.Control
              type="url"
              value={formData.repo.front}
              onChange={changeData}
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="repo.back">
            <Form.Label>Repo back</Form.Label>
            <Form.Control
              type="url"
              value={formData.repo.back}
              onChange={changeData}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="trello">
            <Form.Label>Trello</Form.Label>
            <Form.Control
              type="url"
              value={formData.trello}
              onChange={changeData}
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="tutor.id">
            <Form.Label>Tutor</Form.Label>
            <Form.Select value={formData.tutor.id} onChange={changeData}>
              <option value="">Elige tutor</option>
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
