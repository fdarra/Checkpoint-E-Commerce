import {
  ADD_TO_CART,
  ADD_TO_WISHES,
  CLEAR_CART,
  CLEAR_WISHES,
  GET_CART_FROM_STORAGE,
  GET_WISHES_FROM_STORAGE,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHES,
  UPDATE_CART,
  UPDATE_WISHES,
} from "../Actiontypes/Cart_Wishes_ListActionTypes";

const initialState = {
  cart: [],
  wishes: [],
};

const Cart_wishesListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CART_FROM_STORAGE:
      return { ...state, cart: payload };

    case ADD_TO_CART:
      // const product = payload;
      // const exist = state.cart.find((item) => item._id === product._id);
      // if (!exist)
         return { ...state, cart: payload };


    case REMOVE_FROM_CART:
      return { ...state, cart: payload };
    case UPDATE_CART:
      return { ...state, cart: payload };

    case CLEAR_CART:
      return { ...state, cart: payload };

    case GET_WISHES_FROM_STORAGE:
      return { ...state, wishes: payload };


    case ADD_TO_WISHES:
      // const wish = payload;
      // const wishExist = state.wishes.find((item) =>  item._id === wish._id);
      // if (!wishExist)
         return { ...state, wishes: payload };

    case REMOVE_FROM_WISHES:
      return { ...state, wishes: payload };
    case UPDATE_WISHES:
      return { ...state, wishes: payload };
    case CLEAR_WISHES:
      return { ...state, wishes: payload };


    default:
      return state;
  }
};

export default Cart_wishesListReducer;
