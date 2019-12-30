import { combineReducers } from "redux";
import programs from "./programs";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import programDetail from "./programDetail";
import exercises from "./exercises";

export default combineReducers({
  programs: programs, // can be just written as programs since theyre same.
  errors: errors,
  messages: messages,
  programDetail: programDetail,
  exercises: exercises,
  auth
});
