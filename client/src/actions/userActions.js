import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";
import { loginUser, registerUser } from "../api/utils";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  const { data } = await loginUser(email, password);
  if (data !== "Invalid") {
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } else {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: "Invalid Email or Password. Please Try Again !",
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register =
  (firstName, lastName, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await registerUser(firstName, lastName, email, password);
    if (data !== "User exists") {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: "Email already in use. please use a different Email",
      });
    }
  };
