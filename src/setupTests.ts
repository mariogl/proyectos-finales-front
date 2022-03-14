// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es.json";
import { server } from "./mocks/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

TimeAgo.addDefaultLocale(es);
