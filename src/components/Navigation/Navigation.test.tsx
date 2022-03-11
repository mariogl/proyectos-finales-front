import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import customRender from "../../testUtils";
import Navigation from "./Navigation";

describe("Given a Navigation component", () => {
  describe("When it's rendered", () => {
    test("Then it should show three buttons with tutors' names", () => {
      customRender(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );

      const tutor1 = screen.queryByRole("button", { name: /menchu/i });
      const tutor2 = screen.queryByRole("button", { name: /pia/i });
      const tutor3 = screen.queryByRole("button", { name: /oleguer/i });

      expect(tutor1).toBeInTheDocument();
      expect(tutor2).toBeInTheDocument();
      expect(tutor3).toBeInTheDocument();
    });
  });
});
