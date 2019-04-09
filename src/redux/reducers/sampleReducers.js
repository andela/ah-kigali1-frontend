import { SOME_ACTION } from "../actionTypes";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SOME_ACTION:
      return state;
    default:
      return state;
  }
};
