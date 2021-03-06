import { rest } from "msw";
import { randomProjects } from "../factories/project";

export const handlers = [
  rest.get("https://api.github.com/repos/*", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{ commit: { author: { date: "2022-03-10T09:44:15Z" } } }])
    );
  }),
  rest.get(`${process.env.REACT_APP_API_URL}projects`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        projects: randomProjects(3),
      })
    )
  ),
  rest.get(
    `${process.env.REACT_APP_API_URL}projects/sonardata`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          codeSmells: "0",
          coverage: "0",
        })
      )
  ),
];
