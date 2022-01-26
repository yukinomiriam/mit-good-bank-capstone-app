import UserService from "../services/user.service";
import { GET_BALANCE, GET_BALANCE_FAIL, SET_MESSAGE } from "./type";

export const getUserBalance = (id) => (dispatch) => {
  return UserService.getUserBalance(id).then(
    (response) => {
      dispatch({
        type: GET_BALANCE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_BALANCE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
