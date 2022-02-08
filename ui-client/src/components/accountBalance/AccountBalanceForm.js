import AccountHeader from "../account/AccountHeader";

function AccountBalanceForm(props) {
  return (
    <>
      <AccountHeader currentUser={props.currentUser} balance={props.balance} />
      <br />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4">
            <h5>
              <label htmlFor={`amt${props.label}`}>
                {" "}
                {props.label} Amount:
              </label>
            </h5>
          </div>
          <div className="col-4">
            <input
              id={`amt${props.label}`}
              placeholder="0"
              className="form-control amount-input"
              onChange={props.validateTransaction}
            ></input>
          </div>
        </div>
      </div>
      <br />
      <div className="container my-3">
        <div className="col-md-12 text-center">
          <button
            type="submit"
            className="btn brand-button"
            onClick={props.handleSubmit}
            disabled={!props.validTransaction}
          >
            Submit {props.label}
          </button>
        </div>
      </div>
    </>
  );
}

export default AccountBalanceForm;
