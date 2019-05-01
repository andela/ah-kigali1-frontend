import { combineReducers } from "redux";
import loginReducers from "./authReducers";
import resetPasswordReducers from "./resetPasswordReducers";
import updatePasswordReducers from "./updatePasswordReducers";
import socialAuthReducers from "./socialAuthReducers";
import createArticleReducer from "./createArticleReducer";
import readArticleReducer from "./readArticleReducer";
import userReducer from "./userReducer";
<<<<<<< HEAD
import searchReducers from "./searchReducers";
=======
import following from "./followingReducer";
>>>>>>> [Feature #163518655] add following functionality

export default combineReducers({
  auth: loginReducers,
  article: createArticleReducer,
  resetPassword: resetPasswordReducers,
  updatePassword: updatePasswordReducers,
  socialAuth: socialAuthReducers,
  fetchedArticle: readArticleReducer,
  user: userReducer,
<<<<<<< HEAD
  search: searchReducers
=======
  following
>>>>>>> [Feature #163518655] add following functionality
});
