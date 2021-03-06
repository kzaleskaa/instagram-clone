import axios from "axios";
import { AUTHENTICATED_FAIL, AUTHENTICATED_SUCCESS } from "../types/types";

export const checkAuthentication = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/auth/jwt/verify/`,
        JSON.stringify({ token: localStorage.getItem("access") }),
        configuration
      );

      if (response.data.code === "token_not_valid") {
        dispatch({ type: AUTHENTICATED_FAIL });
      } else {
        dispatch({ type: AUTHENTICATED_SUCCESS });
      }
    } catch (err) {
      dispatch({ type: AUTHENTICATED_FAIL });
    }
  } else {
    dispatch({ type: AUTHENTICATED_FAIL });
  }
};
