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
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_LOAD });

  try {
    const result = await axios.get("/api/product/getProducts");

    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, payload: error.message });
  }
};

///GET DISTINCT GENDERS
export const getDistinctGenders = () => async (dispatch) => {
  dispatch({ type: GET_GENDERS_LOAD });

  try {
    const genders = await axios.get("/api/product/getDistinctGender");

    dispatch({ type: GET_GENDERS_SUCCESS, payload: genders.data });
  } catch (error) {
    dispatch({ type: GET_GENDERS_FAIL, payload: error.message });
  }
};

///GET DISTINCT CATEGORYS

export const getDistinctCategory = () => async (dispatch) => {
  dispatch({ type: GET_CATEGORYS_LOAD });

  try {
    const categorys = await axios.get("/api/product/getDistinctCategory");

    dispatch({ type: GET_CATEGORYS_SUCCESS, payload: categorys.data });
  } catch (error) {
    dispatch({ type: GET_CATEGORYS_FAIL, payload: error.message });
  }
};

/// get product by gender  & category name

export const getProductsByGC = (gender, category) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_BY_GC_LOAD });

  try {
    const result = await axios.get(
      `/api/product/getProductBygenderByCategory/${gender}/${category}`
    );

    dispatch({
      type: GET_PRODUCTS_BY_GC_SUCCESS,
      payload: result.data.Founded,
    });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_BY_GC_FAIL, payload: error.message });
  }
};

///// get PRODUCTS BY GENDER AND BY CATEGORY & distict title
export const getProductsByGC_DT = (gender, category) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_BY_GC_DT_LOAD });
  try {
    const result = await axios.get(
      `/api/product/getProductBygenderByCategoryDistinctTitles/${gender}/${category}`
    );

    dispatch({
      type: GET_PRODUCTS_BY_GC_DT_SUCCESS,
      payload: result.data.Founded,
    });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_BY_GC_DT_FAIL, payload: error.message });
  }
};

////// get product by id

export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_BY_ID_LOAD });

  try {
    const result = await axios.get(`/api/product/getProductById/${id}`);

    dispatch({
      type: GET_PRODUCT_BY_ID_SUCCESS,
      payload: result.data.productFounded,
    });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_BY_ID_FAIL, payload: error.message });
  }
};

////// get distinct colors 

export const getColors = (title) => async (dispatch) => {
  dispatch({ type: GET_COLORS_LOAD });
  console.log("title action",title)
  try {
   
    const result = await axios.get(`/api/product/getColors/${title}`);
    console.log("para",result)
    dispatch({
      type: GET_COLORS_SUCCESS,
      payload: result.data
    });
  } catch (error) {
    dispatch({ type: GET_COLORS_FAIL, payload: error.message });
  }
};

export const getAllSizes = ( ) => async (dispatch) => {
  dispatch({ type: GET_TITLES_SIZES_LOAD });

  try {
   
    const result = await axios.get(`/api/product/getAllSizes`);
  
    dispatch({
      type: GET_TITLES_SIZES_SUCCESS,
      payload: result.data
    });
  } catch (error) {
    dispatch({ type:  GET_TITLES_SIZES_FAIL, payload: error.message });
  }
};


