import { combineReducers } from "redux";
import movie from "./slices/moviesSlice";
import auth from "./slices/authSlice";

export default combineReducers({
    auth,
    movie,
});
