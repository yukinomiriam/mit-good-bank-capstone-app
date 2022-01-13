import React, { useEffect } from "react";
import Card from "../Card";
import AccountForm from "./AccountForm";

import { UserContext } from "../../context";

function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    let errorMessage = "";
    if (!field) {
      errorMessage = `Error:  ${label} is required`;
      setStatus(errorMessage);
      return false;
    }
    // validate email format
    if (
      label === "email" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(field)
    ) {
      errorMessage = `Error: Email has an invalid format`;
      setStatus(errorMessage);
      return false;
    }
    // validate password
    if (label === "password" && field.length < 8) {
      errorMessage = `Error: Password should have at least 8 characters`;
      setStatus(errorMessage);
      return false;
    }
    //console.log(`field: ${field}`);
    //console.log(`label: ${label}`);
    setStatus("");
    return true;
  }

  useEffect(() => {
    let isMounted = true;
    if (status !== "") {
      //console.log(`Called useEffect Create Account`);
      setTimeout(() => {
        if (isMounted) setStatus("");
      }, 3000);
    }

    return () => (isMounted = false);
  }, [status]);

  function handleCreate() {
    console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    //ctx.users.push({ name, email, password, balance: 100, isLogged: "false" });
    const URL = `/account/create/${name}/${email}/${password}`;
    (async () => {
      var res = await fetch(URL);
      var data = await res.json();
      console.log(data);
    })();
    setShow(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
    setIsDisabled(true);
  }

  function handleNameChange(e) {
    setIsDisabled(false);
    setName(e.currentTarget.value);
    //console.log("N: " + e.currentTarget.value);
    if (e.currentTarget.value === "" && email === "" && password === "")
      setIsDisabled(true);
  }

  function handleEmailChange(e) {
    setIsDisabled(false);
    setEmail(e.currentTarget.value);
    if (name === "" && e.currentTarget.value === "" && password === "")
      setIsDisabled(true);
  }

  function handlePasswordChange(e) {
    setIsDisabled(false);
    setPassword(e.currentTarget.value);
    if (name === "" && email === "" && e.currentTarget.value === "")
      setIsDisabled(true);
  }

  const newAccountForm = (
    <AccountForm
      name={name}
      handleNameChange={handleNameChange}
      email={email}
      handleEmailChange={handleEmailChange}
      password={password}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleCreate}
      isDisabled={isDisabled}
      isNewAccount={true}
      label="Create Account"
    />
  );

  return (
    <Card
      header="Create Account"
      className="card brand-centered brand-margin-top"
      maxWidth="40rem"
      status={status}
      body={
        show ? (
          newAccountForm
        ) : (
          <>
            <h5>Success</h5>
            <button
              type="submit"
              className="btn brand-button"
              onClick={clearForm}
            >
              Add another account
            </button>
            <br />
          </>
        )
      }
    />
  );
}

export default CreateAccount;
