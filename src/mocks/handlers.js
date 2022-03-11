import { rest } from "msw";
import { randomProjects } from "./projects";

export const handlers = [
  rest.get("https://api.github.com/repos/*", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{ commit: { author: { date: "2022-03-10T09:44:15Z" } } }])
    );
  }),
  rest.get(process.env.REACT_APP_API_URL, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        projects: randomProjects(3),
      })
    )
  ),
];
