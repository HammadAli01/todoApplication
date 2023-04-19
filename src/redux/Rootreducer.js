import { combineReducers } from "redux";
import todoReducer from "./reducers/Reducers";

const rootReducer = combineReducers({
  todoReducer,
});
export default rootReducer;
