import { rest } from "msw";
import { randomProjects } from "./projects";

export const handlers = [
  rest.get(
    `${process.env.REACT_APP_GITHUB_API}repos/isdi-coders-2022/*`,
    (req, res, ctx) =>
      res(ctx.status(200), ctx.json({ pushed_at: "2022-03-10T09:44:15Z" }))
  ),
  rest.get(process.env.REACT_APP_API_URL, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        projects: randomProjects(3),
      })
    )
  ),
];
