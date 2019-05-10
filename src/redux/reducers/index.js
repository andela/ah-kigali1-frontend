import { combineReducers } from "redux";
import loginReducers from "./authReducers";
import resetPasswordReducers from "./resetPasswordReducers";
import updatePasswordReducers from "./updatePasswordReducers";
import socialAuthReducers from "./socialAuthReducers";
import createArticleReducer from "./createArticleReducer";
import readArticleReducer from "./readArticleReducer";
import userReducer from "./userReducer";
import searchReducers from "./searchReducers";
import following from "./followingReducer";
import notifier from "./notificationReducer";
import { reportArticle } from "./reportReducer";
import registration from "./registrationReducers";

export default combineReducers({
  auth: loginReducers,
  article: createArticleReducer,
  resetPassword: resetPasswordReducers,
  updatePassword: updatePasswordReducers,
  socialAuth: socialAuthReducers,
  fetchedArticle: readArticleReducer,
  user: userReducer,
  search: searchReducers,
  following,
  notifier,
  report: reportArticle,
  registration
});
