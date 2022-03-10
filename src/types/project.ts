interface Project {
  id: string;
  name: string;
  student: string;
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
