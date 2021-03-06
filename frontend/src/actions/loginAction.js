import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  GET_ERROR,
} from "../types/types";

export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/auth/users/me/`,
        configuration
      );

      dispatch({ type: LOAD_USER_SUCCESS, payload: response.data });
    } catch (err) {
      const error = { msg: err.response.data, status: err.response.status };

      dispatch({ type: LOAD_USER_FAIL });
      dispatch({ type: GET_ERROR, payload: error });
    }
  } else {
    dispatch({ type: LOAD_USER_FAIL });
  }
};

export const login = (email, password) => async (dispatch) => {
  const configuration = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/auth/jwt/create/`,
      JSON.stringify({ email, password }),
      configuration
    );

    dispatch({ type: LOGIN_SUCCESS, payload: response.data });

    dispatch(loadUser());
  } catch (err) {
    const error = {
      msg: { login: err.response.data },
      status: err.response.status,
    };
    dispatch({ type: LOGIN_FAIL });
    dispatch({ type: GET_ERROR, payload: error });
  }
};
