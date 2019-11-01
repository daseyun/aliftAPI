import { combineReducers } from "redux";
import programs from "./programs";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  programs: programs, // can be just written as programs since theyre same.
  errors: errors,
  messages: messages
});
