import { GET_EXERCISES } from "../actions/types.js";

const initialState = {
  exercises: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EXERCISES:
      return {
        ...state, // gets all properties of initialState.
        exercises: action.payload
      };

    default:
      return state;
  }
}
