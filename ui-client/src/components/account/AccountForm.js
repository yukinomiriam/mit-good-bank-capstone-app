function AccountForm(props) {
  return (
    <>
      {props.isNewAccount && (
        <>
          Name: <br />
          <input
            type="input"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={props.name}
            onChange={props.handleNameChange}
          />
          <br />
        </>
      )}
      Email Address: <br />
      <input
        type="input"
        className="form-control"
        id="email"
        placeholder="Enter email"
        value={props.email}
        onChange={props.handleEmailChange}
      />
      <br />
      Password: <br />
      <input
        type="password"
        className="form-control"
        id="password"
        placeholder="Enter password"
        value={props.password}
        onChange={props.handlePasswordChange}
      />
      <br />
      <div className="container my-3 bg-light">
        <div className="col-md-12 text-center">
          <button
            type="submit"
            className="btn brand-button"
            onClick={props.handleSubmit}
            disabled={props.isDisabled}
          >
            {props.label}
          </button>
          <br />
        </div>
      </div>
    </>
  );
}

export default AccountForm;
