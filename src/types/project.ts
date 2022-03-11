interface Project {
  id: string;
  name: string;
  student: string;
  trello: string;
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
