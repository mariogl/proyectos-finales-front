interface Project {
  id: string;
  name: string;
  folder: string;
  student: string;
  trello: string;
  sonarqubeKey: string;
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
