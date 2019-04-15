import { UPDATE_PASSWORD_INPUT_CHANGE } from "../actionTypes";

export const handleInputChange = (field, value) => ({
  type: UPDATE_PASSWORD_INPUT_CHANGE,
  payload: { field, value }
});
