import { combineReducers } from "redux";
import user from "./user_reducer";
import like from "./like_reducer";
import posts from "./post_reducer";

const rootReducer = combineReducers({
  user,
  // like,
  posts,
});

export default rootReducer;
