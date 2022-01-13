import "./css/styles.css";
import "./css/bootstrap.css";

import NavBar from "./components/navbar/NavBar";
import Home from "./components/Home";
import CreateAccount from "./components/account/CreateAccount";
import Login from "./components/account/Login";
import Deposit from "./components/accountBalance/Deposit";
import Withdraw from "./components/accountBalance/Withdraw";
import AllData from "./components/allData/AllData";
import Footer from "./components/Footer";

import { UserContext } from "./context";
import { HashRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <UserContext.Provider
          value={{
            users: [
              {
                name: "Abel",
                email: "abel@mit.edu",
                password: "secret",
                balance: 100,
                isLogged: "true",
              },
            ],
          }}
        >
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/Login/" component={Login} />
            <Route path="/Deposit/" component={Deposit} />
            <Route path="/Withdraw/" component={Withdraw} />
            <Route path="/AllData/" component={AllData} />
          </div>
        </UserContext.Provider>
      </Router>
      <Footer />
    </>
  );
}

export default App;
