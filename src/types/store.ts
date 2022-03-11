import Project from "./project";

interface RootState {
  projects: {
    list: Project[];
    filterBy: string;
  };
}

export default RootState;
