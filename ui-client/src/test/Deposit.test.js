import React from "react";

import { render } from "@testing-library/react";
import { UserContext } from '../context';
import { fireEvent } from "@testing-library/dom";

test("test Deposit amount", () => {
    // need to create ctx
    const { getByText, getByLabelText } = render(
      <UserContext.Provider value={{users:[{name:'Abel',email:'abel@mit.edu',password:'secret',balance:100, isLogged:'true'}]}}>
        <Deposit />
      </UserContext.Provider>
    );
  
    
    // after rendering our component
    getByText("Balance:");
    const input = getByLabelText("Deposit Amount:");
    fireEvent.change(input, { target: { value: 100 } });
    fireEvent.click(getByText("Submit Deposit"));
  
    // confirm data
    getByText("$200.00");
  });