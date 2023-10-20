import React from "react";
import LogIn from "./LogIn";
import { UserContext, UserProvider } from "../../contexts/UserContext";
import { WebsocketContextProvider } from "../../contexts/WebsocketContext";
import { BrowserRouter } from "react-router-dom";

const userContextValue = {
  username: "Tester",
  // setUserName: jest.fn(),
  roomid: 1,
  // setRoomId: jest.fn(),
  userid: 1,
  // setUserId: jest.fn(),
  clickedCard: null,
  // onCardClicked: jest.fn(),
  targetsEnable: null,
};

describe("<LogIn />", () => {
  beforeEach("Mount component", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <LogIn />
        </UserContext.Provider>
      </BrowserRouter>
    );
  });
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
  });

  it("button is enabled and disabled properly", () => {
    //Jugar button is expected to be disabled
    cy.get("button").should("be.disabled");

    //Username input
    cy.get("input").type("Tester");

    //Jugar button is expected to be enabled
    cy.get("button").should("be.enabled");
  });
});
