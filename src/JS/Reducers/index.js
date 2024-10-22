import { combineReducers } from "redux";
import ProductReducer from "./ProductReducer";
import AuthReducer from "./AuthReducer";
import Cart_wishesListReducer from "./Cart_wishesListReducer"




const rootReducer = combineReducers({ProductReducer,AuthReducer,Cart_wishesListReducer});

export default rootReducer;