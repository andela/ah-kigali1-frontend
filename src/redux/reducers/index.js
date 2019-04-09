import { combineReducers } from "redux";
import sampleReducers from "./sampleReducers";

const reducers = combineReducers({
  sample: sampleReducers
});
export default reducers;
