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

export const getCartFromStorage = () => (dispatch) => {
  const cartFromLocalStorage = localStorage.getItem("cartList");
  cartFromLocalStorage
    ? dispatch({
        type: GET_CART_FROM_STORAGE,
        payload: JSON.parse(cartFromLocalStorage),
      })
    : dispatch({ type: GET_CART_FROM_STORAGE, payload: [] });
};

export const addToCartList =
  (product, cartList) =>
  async (dispatch) => {
    // S'assurer que cartList est un tableau
    const currentCartList = Array.isArray(cartList) ? cartList : [];
    console.log("acion : Ajouter le produit au début de la liste",currentCartList)
    const newCartList = [product, ...currentCartList];
    // Sauvegarder le nouveau panier dans localStorage
    console.log("acion : Sauvegarder le nouveau panier dans localStorage",newCartList)
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    dispatch({ type: ADD_TO_CART, payload: newCartList });
  };

export const removeFromCartList =( _id, cartList ) => async (dispatch) => {
    // S'assurer que cartList est un tableau
    const currentCartList = Array.isArray(cartList) ? cartList : [];

    const updatedCartList = currentCartList.filter((item) => item._id !== _id);
    // Sauvegarder le nouveau panier dans localStorage
    localStorage.setItem("cartList", JSON.stringify(updatedCartList));
    dispatch({ type: REMOVE_FROM_CART, payload: updatedCartList });
  };

export const updatedCartList = (product, cartList) => async (dispatch) => {
   // S'assurer que cartList est un tableau
   const currentCartList = Array.isArray(cartList) ? cartList : [];
  const updatedCartList = currentCartList.map((item) =>
    item._id === product._id ? product : item
  );
  // Sauvegarder le nouveau panier dans localStorage
  localStorage.setItem("cartList", JSON.stringify(updatedCartList));
  dispatch({ type: UPDATE_CART, payload: updatedCartList });
};

export const clearCartList = () => async (dispatch) => {
  // Sauvegarder le nouveau panier dans localStorage
  localStorage.setItem("cartList", []);
  dispatch({ type: CLEAR_CART, payload: [] });
};

export const getWishesFromStorage = () => (dispatch) => {
  const wishesFromLocalStorage = localStorage.getItem("wishes");
  wishesFromLocalStorage
    ? dispatch({
        type: GET_WISHES_FROM_STORAGE,
        payload: JSON.parse(wishesFromLocalStorage),
      })
    : dispatch({ type: GET_WISHES_FROM_STORAGE, payload: [] });
};

export const addToWishesList  = (product, wishesList ) => async (dispatch) => {
  const currentWishesList = Array.isArray(wishesList) ? wishesList : [];

    const newWishes = [product, ...currentWishesList];
    // Sauvegarder le nouveau panier dans localStorage
    localStorage.setItem("wishes", JSON.stringify(newWishes));
    dispatch({ type: ADD_TO_WISHES, payload: newWishes });
  };

export const removeFromWishesList = ( _id, wishesList ) =>  (dispatch) => 
  {
    const currentWishesList = Array.isArray(wishesList) ? wishesList : [];

    const updatedWishesList =  currentWishesList.filter((element) =>element._id && element._id !== _id);
    // Sauvegarder le nouveau panier dans localStorage
    localStorage.setItem("wishes", JSON.stringify(updatedWishesList));

    dispatch({ type: REMOVE_FROM_WISHES, payload: updatedWishesList });
  };

export const updatedWishesList = (product, wishesList) => async (dispatch) => {
  
  const currentWishesList = Array.isArray(wishesList) ? wishesList : [];
  const updatedWishesList = currentWishesList.map((item) =>
    item._id === product._id ? product : item
  );
  // Sauvegarder le nouveau panier dans localStorage
  localStorage.setItem("wishes", JSON.stringify(updatedWishesList));
  dispatch({ type: UPDATE_WISHES, payload: updatedWishesList });
};

export const clearWishesList = () => async (dispatch) => {
  // Sauvegarder le nouveau panier dans localStorage
  localStorage.setItem("wishes", []);
  dispatch({ type: CLEAR_WISHES, payload: [] });
};
