
import {
  GET_CATEGORYS_FAIL,
  GET_CATEGORYS_LOAD,
  GET_CATEGORYS_SUCCESS,
  GET_COLORS_FAIL,
  GET_COLORS_LOAD,
  GET_COLORS_SUCCESS,
  GET_GENDERS_FAIL,
  GET_GENDERS_LOAD,
  GET_GENDERS_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
  GET_PRODUCT_BY_ID_LOAD,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCTS_BY_GC_DT_FAIL,
  GET_PRODUCTS_BY_GC_DT_LOAD,
  GET_PRODUCTS_BY_GC_DT_SUCCESS,
  GET_PRODUCTS_BY_GC_FAIL,
  GET_PRODUCTS_BY_GC_LOAD,
  GET_PRODUCTS_BY_GC_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_LOAD,
  GET_PRODUCTS_SUCCESS,
  GET_TITLES_SIZES_FAIL,
  GET_TITLES_SIZES_LOAD,
  GET_TITLES_SIZES_SUCCESS,
} from "../Actiontypes/ProductActionTypes";

const initialState = {
  load: false,
  success: null,
  error: null,
  products: [],
  productsByGC: [],
  productsByGC_DT:[],
  product_:{},
  colors:[],
  sizes:[],
  allsizes:[,]

};

const ProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {



    ///// ALL PRODUCTS


    case GET_PRODUCTS_LOAD:
      return {
        ...state,
        load: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, load: false, success: true, products: payload };

    case GET_PRODUCTS_FAIL:
      return { ...state, load: false, success: null, error: payload };


       ///// distinct GENDERS

    case GET_GENDERS_LOAD:
      return { ...state, load: true };

    case GET_GENDERS_SUCCESS:
      return { ...state, load: false, success: true, genders: payload };

    case GET_GENDERS_FAIL:
      return { ...state, load: false, success: null, error: payload };


      ///// distinct CATEGORYS

      case GET_CATEGORYS_LOAD:
        return { ...state, load: true };
  
      case GET_CATEGORYS_SUCCESS:
        return { ...state, load: false, success: true, categorys: payload };
  
      case GET_CATEGORYS_FAIL:
        return { ...state, load: false, success: null, error: payload };


        /////// get products by gender & category names

        case GET_PRODUCTS_BY_GC_DT_LOAD:
          return {
            ...state,
            load: true,
          };
        case GET_PRODUCTS_BY_GC_DT_SUCCESS:
          return { ...state, load: false, success: true, productsByGC_DT: payload };
    
        case GET_PRODUCTS_BY_GC_DT_FAIL:
          return { ...state, load: false, success: null, error: payload };




/////// GET_PRODUCT_BY_ID


case GET_PRODUCT_BY_ID_LOAD:
  return {
    ...state,
    load: true,
  };
case GET_PRODUCT_BY_ID_SUCCESS:
  return { ...state, load: false, success: true, product_: payload };

case GET_PRODUCT_BY_ID_FAIL:
  return { ...state, load: false, success: null, error: payload };



  /////// GET_COLORS_BY_TITLE


case GET_COLORS_LOAD:
  return {
    ...state,
    load: true,
  };
case GET_COLORS_SUCCESS:
  return { ...state, load: false, success: true, colors: payload.colors,sizes: payload.sizes };

case GET_COLORS_FAIL:
  return { ...state, load: false, success: null, error: payload };

/// get all titles & sizes

  case   GET_TITLES_SIZES_LOAD:
  return {
    ...state,
    load: true,
  };
case GET_TITLES_SIZES_SUCCESS:
  return { ...state, load: false, success: true, allSizes: payload };

case GET_TITLES_SIZES_FAIL:
  return { ...state, load: false, success: null, error: payload };





    default:
      return state;
  }
};

export default ProductReducer;
