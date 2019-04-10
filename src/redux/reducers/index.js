import { combineReducers } from "redux";
import loginReducers from "./loginReducers";
import sampleReducers from "./sampleReducers";
import userReducer from "./userReducer";

export default combineReducers({
  sample: sampleReducers,
  user: userReducer,
  login: loginReducers
});
