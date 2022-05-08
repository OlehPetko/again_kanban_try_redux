import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";
import cards from "./reducer";

 const store = createStore(
     cards,
     composeWithDevTools(applyMiddleware(thunk))
 )

export default store