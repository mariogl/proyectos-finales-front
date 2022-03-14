import faker from "@faker-js/faker";
import { Factory } from "fishery";
import Project from "../types/project";

const mongoId = () =>
  ((s = (n: number) => Math.floor(n).toString(16)) =>
    s(Date.now() / 1000) +
    " ".repeat(16).replace(/./g, () => s(Math.random() * 16)))();

const getProject = (blank = false) => ({
  id: blank ? "" : mongoId(),
  name: blank ? "" : faker.name.findName(),
  student: blank ? "" : faker.name.firstName(),
  trello: blank ? "" : faker.internet.url(),
  sonarqubeKey: {
    front: blank ? "" : faker.name.firstName(),
    back: blank ? "" : faker.name.firstName(),
  },
  repo: {
    back: blank ? "" : faker.internet.url(),
    front: blank ? "" : faker.internet.url(),
  },
  tutor: {
    id: blank ? "" : mongoId(),
    name: blank ? "" : faker.name.findName(),
  },
});

const projectFactory = Factory.define<Project>(() => getProject());

export const randomProject = (): Project => projectFactory.build();
export const randomProjects = (total = 2): Project[] =>
  projectFactory.buildList(total);
export const blankProject = (): Project => getProject(true);
