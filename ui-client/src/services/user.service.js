import axios from "axios";
import authHeader from "./auth-header";

const PORT = process.env.PORT || 3000;
const API_URL = "http://localhost:" + PORT + "/api/user/";

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

  updateUserBalance(id, balance) {
    const newBalance = {
      balance: balance,
    };
    console.log("updateUserBalance: " + API_URL + "balance/" + id);
    console.log(newBalance);
    return axios
      .put(API_URL + "balance/" + id, newBalance, { headers: authHeader() })
      .then((response) => {
        console.log("response: updateUserBalance");
        console.log(response.data);
        return response.data;
      });
  }
}

export default new UserService();
