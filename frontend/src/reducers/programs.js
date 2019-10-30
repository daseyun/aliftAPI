import { GET_PROGRAMS, DELETE_PROGRAM, ADD_PROGRAM } from "../actions/types.js";

const initialState = {
  programs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROGRAMS:
      return {
        ...state, // gets all properties of initialState.
        programs: action.payload
      };
    case DELETE_PROGRAM:
      return {
        ...state, // gets all properties of initialState.
        programs: state.programs.filter(
          program => program.id !== action.payload
        )
      };
    case ADD_PROGRAM:
      return {
        ...state, // gets all properties of initialState.
        programs: [...state.programs, action.payload] // [existing programs, append new payload program]
      };
    default:
      return state;
  }
}
