// any actions to fire off go here.
// HTTP requests.

// axios for async requests
import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_PROGRAM } from "./types";

// GET PROGRAMS

// dispatch whenever we wanna dispatch an action to our reducer (ex. GET_PROGRAMS)
// dispatched to reducer. (/reducers/programs.js)
export const getProgram = id => (dispatch, getState) => {
  axios
    .get("/programs/" + id + "/", tokenConfig(getState)) // pass in: tokenConfig(getState) for any protected route.
    .then(res => {
      dispatch({
        type: GET_PROGRAM,
        payload: res.data //reducer is expecting a type. in /reducers/programs.js
      });
    })

    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
