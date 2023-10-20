import React from "react";
import Room from "./Room";
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

describe("<Room />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <WebsocketContextProvider>
          <UserContext.Provider value={userContextValue}>
            <Room />
          </UserContext.Provider>
        </WebsocketContextProvider>
      </BrowserRouter>
    );
  });
});
