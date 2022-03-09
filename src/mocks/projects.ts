import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import Project from "../types/project";

const mongoid = () =>
  ((s = (n: number) => Math.floor(n).toString(16)) =>
    s(Date.now() / 1000) +
    " ".repeat(16).replace(/./g, () => s(Math.random() * 16)))();

const projectsFactory = Factory.define<Project>(() => ({
  id: mongoid(),
  name: faker.name.findName(),
  student: faker.name.findName(),
  repo: {
    front: "",
    back: "",
  },
}));

export const randomProject = (): Project => projectsFactory.build();
export const randomProjects = (number = 2): Project[] =>
  projectsFactory.buildList(number);
