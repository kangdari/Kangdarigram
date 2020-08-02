import { handleActions } from "redux-actions";
import { START_LOADING, FINISH_LOADING } from "../_actions/types";

const initialState = {
  loading: "",
  type: "",
};

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      loading: true,
      type: action.payload,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      loading: false,
      type: action.payload,
    }),
  },
  initialState,
);

export default loading;
