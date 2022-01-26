import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:3001/api/user/";

class UserService {
  getUserBalance(id) {
    return axios
      .get(API_URL + "balance/" + id, { headers: authHeader() })
      .then((response) => {
        console.log("response: getUserBalance");
        console.log(response.data);
        return response.data;
      });
  }
}

export default new UserService();
