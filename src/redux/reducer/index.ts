import { combineReducers } from "redux";
import RootState from "../../types/store";
import projectsReducer from "./projectsReducer";

const rootReducer = combineReducers<RootState>({
  projects: projectsReducer,
});

export default rootReducer;
