import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store";
import customRender from "./testUtils";

test("renders App", () => {
  customRender(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
