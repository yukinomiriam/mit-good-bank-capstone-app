import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/";
const DEFAULT_BALANCE = 0;
const DEFAULT_ROLE = ["user"];

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    console.log("logout");
  }

  register(name, email, password) {
    const newUser = {
      username: name,
      email: email,
      password: password,
      balance: DEFAULT_BALANCE,
      roles: DEFAULT_ROLE,
    };
    console.log("newUser: " + newUser);
    return axios.post(API_URL + "createAccount", newUser);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
