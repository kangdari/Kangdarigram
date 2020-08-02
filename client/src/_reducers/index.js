import { combineReducers } from "redux";
import user from "./user_reducer";
import posts from "./post_reducer";
import loading from "./loading_reducer";

const rootReducer = combineReducers({
  user,
  posts,
  loading,
});

export default rootReducer;
