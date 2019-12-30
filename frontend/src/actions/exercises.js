// any actions to fire off go here.
// HTTP requests.

// axios for async requests
import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_EXERCISES } from "./types";

// dispatch whenever we wanna dispatch an action to our reducer (ex. GET_PROGRAMS)
// dispatched to reducer. (/reducers/programs.js)
export const getExercises = () => (dispatch, getState) => {
  axios
    .get("/proc/get-exercises/", tokenConfig(getState)) // pass in: tokenConfig(getState) for any protected route.
    .then(res => {
      dispatch({
        type: GET_EXERCISES,
        payload: res.data //reducer is expecting a type. in /reducers/programs.js
      });
    })

    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
