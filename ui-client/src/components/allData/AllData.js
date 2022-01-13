import React from "react";
import Card from "../Card";
import RowTable from "./RowTable";

function AllData() {
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    //fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);
  return (
    <>
      <Card
        header="All Data"
        className="card brand-centered brand-margin-top"
        maxWidth="40rem"
        body={
          <>
            <table className="brand-table">
              <thead>
                <tr>
                  <th className="brand-table-th">Name</th>
                  <th className="brand-table-th">Email</th>
                  <th className="brand-table-th">Password</th>
                </tr>
              </thead>
              <tbody>
                {
                  /*ctx.users.map((user, i) => (
                  <RowTable data={user} key={i} />
                ))*/
                  data
                }
              </tbody>
            </table>
          </>
        }
      />
    </>
  );
}

export default AllData;
