import { combineReducers, createStore } from "redux";
import { MSReducer } from "./reducers/MSReducer";


const rootReducer = combineReducers({
  MSReducer
})

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
