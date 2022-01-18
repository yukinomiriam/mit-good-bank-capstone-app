import React from "react";
import Card from "../Card";
import RowTable from "./RowTable";

function AllData() {
  const [dataContainer, setDataContainer] = React.useState({ data: [] });

  React.useEffect(() => {
    //fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        setDataContainer({ data: data });
        console.log("data: " + data);
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
                {dataContainer.data.map((user, i) => (
                  <RowTable data={user} key={i} />
                ))}
              </tbody>
            </table>
          </>
        }
      />
    </>
  );
}

export default AllData;
