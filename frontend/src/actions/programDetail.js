// any actions to fire off go here.
// HTTP requests.

// axios for async requests
import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_PROGRAM,
  GET_PROGRAM_DETAIL,
  UPDATE_PROGRAM_DETAIL,
  DELETE_EXERCISE_SET_DETAIL
} from "./types";

// GET PROGRAMS

// dispatch whenever we wanna dispatch an action to our reducer (ex. GET_PROGRAMS)
// dispatched to reducer. (/reducers/programs.js)
export const getProgram = id => (dispatch, getState) => {
  axios
    .get("/proc/get-program/" + id, tokenConfig(getState)) // pass in: tokenConfig(getState) for any protected route.
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

export const getProgramDetail = id => (dispatch, getState) => {
  axios
    .get("/proc/get-program-detail/" + id, tokenConfig(getState)) // pass in: tokenConfig(getState) for any protected route.
    .then(res => {
      dispatch({
        type: GET_PROGRAM_DETAIL,
        payload: res.data //reducer is expecting a type. in /reducers/programs.js
      });
    })

    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateProgramDetail = programDetails => (dispatch, getState) => {
  axios
    .post(
      `/proc/update-program-details/`,
      programDetails,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ updateProgram: "Program Updated" }));
      dispatch({
        type: UPDATE_PROGRAM_DETAIL,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteExerciseSetDetail = exercise_set_detail_ids => (
  dispatch,
  getState
) => {
  axios
    .post(
      `/proc/delete-exerciseSetDetail/`,
      exercise_set_detail_ids,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: DELETE_EXERCISE_SET_DETAIL,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
