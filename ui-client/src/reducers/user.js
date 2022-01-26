import { GET_BALANCE } from "../actions/type";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BALANCE:
      return payload;

    default:
      return state;
  }
}

export default userReducer;
