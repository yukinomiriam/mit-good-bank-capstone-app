import React from "react";
import { MenuItems } from "./MenuItems";

function NavBar() {

  const handleClick = (e) => {
    let targetEl = e.currentTarget;
    let link = targetEl.getElementsByClassName("nav-link")[0];
    let currentlyActive = Array.from(document.getElementsByClassName("active"));
    currentlyActive.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  };

  const pageUrl = window.location.hash === "" ? "#/" : window.location.hash;
  
  const activeItem = {
    home: pageUrl === "#/" ? " active" : "",
    createAccount: pageUrl === "#/CreateAccount/" ? " active" : "",
    login: pageUrl === "#/Login/" ? " active" : "",
    deposit: pageUrl === "#/Deposit/" ? " active" : "",
    withdraw: pageUrl === "#/Withdraw/" ? " active" : "",
    allData: pageUrl === "#/AllData/" ? " active" : "",
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="p-3">
        <img src="bad-bank-3d-logo.png" alt="BadBank" width="65px" />
        <a className="navbar-brand brand-text" href="#/" title="Home Page">
          BadBank
        </a>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          {MenuItems.map(function (item, index) {
            return (
              <li
                className="nav-item px-4"
                key={index}
                onClick={(e) => handleClick(e)}
                id={index}
              >
                <a
                  className={"nav-link" + activeItem[item.id]}
                  href={item.url}
                  title={item.title}
                  data-toggle="tooltip"
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
