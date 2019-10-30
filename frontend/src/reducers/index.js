import { combineReducers } from "redux";
import programs from "./programs";

export default combineReducers({
  programs: programs // can be just written as programs since theyre same.
});
