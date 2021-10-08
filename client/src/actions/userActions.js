import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  const { data } = await axios.post("http://localhost:8081/login", {
    email,
    password,
  });
  if (data != "Invalid") {
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } else {
    dispatch({ type: USER_LOGIN_FAIL, payload: "Invalid Email or Password" });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (firstName, lastName, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  const { data } = await axios.post("http://localhost:8081/register", {
      email,
      firstName,
      lastName,
      password,
    });
    // setLoading(false)
    if (data != "User exists") {
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
        dispatch({ type: USER_REGISTER_FAIL, payload: "Email already in use. please use a different Email" });
    }
};
