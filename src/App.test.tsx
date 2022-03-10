import { BrowserRouter } from "react-router-dom";
import App from "./App";
import customRender from "./testUtils";

test("renders App", () => {
  customRender(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
