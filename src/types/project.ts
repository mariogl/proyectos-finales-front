interface Project {
  id: string;
  name: string;
  student: string;
  repo: {
    front: string;
    back: string;
  };
}

export default Project;
