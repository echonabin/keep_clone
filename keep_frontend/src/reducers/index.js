import { combineReducers } from "redux";
import auth from "./auth";
import note from "./notes";

export default combineReducers({
  auth,
  note,
});
