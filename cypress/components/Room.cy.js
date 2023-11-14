import React from "react";
import Room from "../../src/views/Room/Room";
import { UserContext, UserProvider } from "../../src/contexts/UserContext";
import { WebsocketContextProvider } from "../../src/contexts/WebsocketContext";
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

const basicRoomData = {
  name: "Test Room",
  host_id: 2,
  users: {
    names: ["Tester", "Tester2", "Tester3", "Tester4"],
    min: 4,
    max: 12,
  },
};

const roomDataLeave = {
  users: { names: ["Tester", "Tester2", "Tester4"] },
};

const roomDataJoin = {
  users: { names: ["Tester", "Tester2", "Tester3", "Tester4", "Tester5"] },
};

const roomDataHost = {
  name: "Test Room",
  host_id: 1,
  users: {
    names: ["Tester", "Tester2", "Tester3", "Tester4"],
    min: 4,
    max: 12,
  },
};

const roomData12Players = {
  name: "Test Room",
  host_id: 2,
  users: {
    names: [
      "Tester",
      "Tester2",
      "Tester3",
      "Tester4",
      "Tester5",
      "Tester6",
      "Tester7",
      "Tester8",
      "Tester9",
      "Tester10",
      "Tester11",
      "Tester12",
    ],
    min: 4,
    max: 12,
  },
};

const roomData2players = {
  name: "Test Room",
  host_id: 2,
  users: {
    names: ["Tester", "Tester2"],
    min: 4,
    max: 12,
  },
};

describe("<Room />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <WebsocketContextProvider websocket={cy.stub().as("websocket")}>
            <Room />
          </WebsocketContextProvider>
        </UserContext.Provider>
      </BrowserRouter>
    );
  });

  it("Jugadores should be visible", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <WebsocketContextProvider websocket={cy.stub().as("websocket")}>
            <Room />
          </WebsocketContextProvider>
        </UserContext.Provider>
      </BrowserRouter>
    );
    cy.contains("Jugadores").should("be.visible");
  });

  it("checks for leave room button", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <WebsocketContextProvider websocket={cy.stub().as("websocket")}>
            <Room />
          </WebsocketContextProvider>
        </UserContext.Provider>
      </BrowserRouter>
    );
    cy.contains("Salir").should("be.visible");

    //button should be enabled
    cy.contains("Salir").should("not.be.disabled");

    cy.window().then((win) => {
      cy.stub(win, "leaveRoom").as("handleLeaveRoomStub");
    });

    //click the button
    // cy.contains("Salir").click();

    // cy.get("@handleLeaveRoomStub").should("be.calledOnce");
  });
});
