import faker from "@faker-js/faker";
import { Factory } from "fishery";
import Project from "../types/project";

const mongoId = () =>
  ((s = (n: number) => Math.floor(n).toString(16)) =>
    s(Date.now() / 1000) +
    " ".repeat(16).replace(/./g, () => s(Math.random() * 16)))();

const projectFactory = Factory.define<Project>(() => ({
  id: mongoId(),
  name: faker.name.findName(),
  student: faker.name.firstName(),
  trello: faker.internet.url(),
  sonarqubeKey: faker.name.firstName(),
  repo: {
    back: faker.internet.url(),
    front: faker.internet.url(),
  },
  tutor: {
    id: mongoId(),
    name: faker.name.findName(),
  },
}));

export const randomProject = (): Project => projectFactory.build();
export const randomProjects = (total = 2): Project[] =>
  projectFactory.buildList(total);
