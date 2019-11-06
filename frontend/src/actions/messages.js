import { CREATE_MESSAGE, GET_ERRORS } from "./types";

// CREATE MESSAGE
export const createMessage = msg => {
  return {
    // no async methods with axios so no dispatch.
    type: CREATE_MESSAGE,
    payload: msg
  };
};

// RETURN ERRORS
export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status }
  };
};
