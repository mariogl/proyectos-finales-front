import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { blankProject } from "../../factories/project";
import { createProjectThunk } from "../../redux/thunks/projectsThunks";
import Project from "../../types/project";

interface Tutor {
  id: string;
  name: string;
}

const FormProject = (): JSX.Element => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const initialData: Project = blankProject();

  const [formData, setFormData] = useState<Project>(initialData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    if (validateData()) {
      await dispatch(createProjectThunk(formData));
      navigate("/projects");
    }
  };

  const validateData = (): boolean => {
    return !(
      Object.values(formData).slice(1).includes("") || formData.tutor.id === ""
    );
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
          <Form.Group className="mb-3" controlId="sonarqubeKey.front">
            <Form.Label>Key SonarQube front</Form.Label>
            <Form.Control
              type="text"
              value={formData.sonarqubeKey.front}
              onChange={changeData}
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="sonarqubeKey.back">
            <Form.Label>Key SonarQube back</Form.Label>
            <Form.Control
              type="text"
              value={formData.sonarqubeKey.back}
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
          <Button type="submit" variant="dark" disabled={!validateData()}>
            Crear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormProject;
