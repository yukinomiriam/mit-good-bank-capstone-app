import UserService from "../services/user.service";
import {
  GET_BALANCE,
  GET_BALANCE_FAIL,
  SET_MESSAGE,
  UPDATE_BALANCE,
  UPDATE_BALANCE_FAIL,
} from "./type";

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

export const updateUserBalance = (id, balance) => (dispatch) => {
  return UserService.updateUserBalance(id, balance).then(
    (response) => {
      dispatch({
        type: UPDATE_BALANCE,
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
        type: UPDATE_BALANCE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
