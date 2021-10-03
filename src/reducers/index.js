import {movieReducer,addReducer} from "./isMovieList";
import { combineReducers } from "redux";

const allReducers = combineReducers({
     list: movieReducer,
     result: addReducer
});

export default allReducers;