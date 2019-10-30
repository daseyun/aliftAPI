// any actions to fire off go here.
// HTTP requests.

// axios for async requests
import axios from "axios";

import { GET_PROGRAMS, DELETE_PROGRAM, ADD_PROGRAM } from "./types";

// GET PROGRAMS

// dispatch whenever we wanna dispatch an action to our reducer (ex. GET_PROGRAMS)
// dispatched to reducer. (/reducers/programs.js)
export const getPrograms = () => dispatch => {
  axios
    .get("/programs")
    .then(res => {
      dispatch({
        type: GET_PROGRAMS,
        payload: res.data //reucer is expecting a type. in /reducers/programs.js
      });
    })
    .catch(err => console.log(err));
};

// DELETE PROGRAM
export const deleteProgram = id => dispatch => {
  axios
    .delete(`/programs/${id}/`)
    .then(res => {
      dispatch({
        type: DELETE_PROGRAM,
        payload: id //reucer is expecting a type. in /reducers/programs.js
      });
    })
    .catch(err => console.log(err));
};

// ADD PROGRAM
export const addProgram = program => dispatch => {
  axios
    .post(`/programs/`, program)
    .then(res => {
      dispatch({
        type: ADD_PROGRAM,
        payload: res.data
      });
    })
    .catch(err => console.log(program));
};
