interface Project {
  id: string;
  name: string;
  student: string;
  trello: string;
  sonarqubeKey: {
    front: string;
    back: string;
  };
  tutor: {
    id: string;
    name: string;
  };
  repo: {
    front: string;
    back: string;
  };
}

export default Project;
