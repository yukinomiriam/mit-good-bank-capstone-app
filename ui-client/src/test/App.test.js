import React from "react";

import { render } from "@testing-library/react";

import App from "../App";

test("test the screen has all the menu items", () => {
  const { getByText } = render(<App />);
  //
  getByText("Home");
  getByText("Create Account");
  getByText("Login");
  getByText("Deposit");
  getByText("Withdraw");
  getByText("All Data");
});

test("test the screen has a welcome message", () => {
  const { getByText } = render(<App />);
  getByText("Welcome to BadBank");
});


