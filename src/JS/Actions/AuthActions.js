//////register

import axios from "axios"
import { CLEAR_ERRORS_AUTH, CLEAR_SUCCESS_AUTH, CURRENT_USER, LOGIN_USER_FAIL, LOGIN_USER_LOAD, LOGIN_USER_SUCCESS, LOGOUT_USER, REGISTER_USER_FAIL, REGISTER_USER_LOAD, REGISTER_USER_SUCCESS } from "../Actiontypes/AuthActionTypes"

// Register
export const register = ({newUser, navigate}) => async (dispatch) => {
    dispatch({type: REGISTER_USER_LOAD})
try {
    let result = await axios.post('/api/auth/register', newUser) 
    dispatch({type: REGISTER_USER_SUCCESS, payload: result.data})
    navigate('/')

} catch (error) {
    console.log(error)
    dispatch({type: REGISTER_USER_FAIL, payload: error.message})
}
}


// login
export const login = ({user, navigate}) => async (dispatch) => {
    dispatch({type: LOGIN_USER_LOAD})
try {
    let result = await axios.post('/api/auth/login', user) 
    dispatch({type: LOGIN_USER_SUCCESS, payload: result.data})   
    navigate('/')   
} catch (error) {
    dispatch({type: LOGIN_USER_FAIL, payload: error.response.data.errors})
}
}


// logout 
export const logout = () => async (dispatch) => {
    dispatch({type: LOGOUT_USER})
}

// current
export const current = () => async (dispatch) => {
  dispatch({ type: LOGIN_USER_LOAD });
  try {
        const config = {
          headers: { Authorization: localStorage.getItem("token") },
        };
        console.log(config)
    let result = await axios.get("/api/auth/current", config);
    dispatch({ type: CURRENT_USER, payload: result.data });
  } catch (error) {
    console.log(error)
    dispatch({ type: LOGIN_USER_FAIL, payload: error.response.data.errors });
  }
};


export const clearErrorsAuth = () => {
    return {
        type: CLEAR_ERRORS_AUTH
    }
}

export const clearSuccessAuth = () => {
    return {
        type: CLEAR_SUCCESS_AUTH
    }
}
