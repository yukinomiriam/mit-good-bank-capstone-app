import CurrencyFormat from "react-currency-format";
function AccountHeader(props) {
  return (
    <>
      <div className="container bottom-border">
        <div className="row">
          <div className="col">
            <h4>
              {props.currentUser.firstName} {props.currentUser.lastName}
            </h4>
          </div>
          <div className="col">Account # {props.currentUser.acct}</div>
          <div className="col">
            <h5>
              Account Balance:{" "}
              <CurrencyFormat
                value={props.balance.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </h5>
          </div>
        </div>
        <div className="row">
          <br />
        </div>
      </div>
    </>
  );
}

export default AccountHeader;
