import React from "react";
import Room from "../../src/views/Room/Room";
import { UserContext, UserProvider } from "../../src/contexts/UserContext";
import { WebsocketContextProvider } from "../../src/contexts/WebsocketContext";
import { BrowserRouter } from "react-router-dom";

const sinon = require("sinon");

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

  it("4 players", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <WebsocketContextProvider websocket={cy.stub().as("websocket")}>
            <Room />
          </WebsocketContextProvider>
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.window().then((win) => {
      const event = {
        data: JSON.stringify({ type: "info", room: basicRoomData }),
      };

      win.onRoomMessage(event);
    });

    // room name and user name should be visible
    cy.contains("Test Room").should("be.visible");
    cy.contains("Tester").should("be.visible");
    cy.contains("Tester2").should("be.visible");
    cy.contains("Tester3").should("be.visible");
    cy.contains("Tester4").should("be.visible");

    // start button should be disabled
    cy.contains("Empezar partida").should("be.disabled");

    // salir button should be enabled
    cy.contains("Salir").should("be.enabled");

    // current players should be 4 and max 12
    cy.contains("4/12").should("be.visible");
  });

  it("2 players", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <WebsocketContextProvider websocket={cy.stub().as("websocket")}>
            <Room />
          </WebsocketContextProvider>
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.window().then((win) => {
      const event = {
        data: JSON.stringify({ type: "info", room: roomData2players }),
      };

      win.onRoomMessage(event);
    });
    // room name and user name should be visible
    cy.contains("Test Room").should("be.visible");
    cy.contains("Tester").should("be.visible");
    cy.contains("Tester2").should("be.visible");

    // start button should be disabled
    cy.contains("Empezar partida").should("be.disabled");

    // salir button should be enabled
    cy.contains("Salir").should("be.enabled");

    // current players should be 2 and max 12
    cy.contains("2/12").should("be.visible");
  });
  it("4 players and one leaves", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <WebsocketContextProvider websocket={cy.stub().as("websocket")}>
            <Room />
          </WebsocketContextProvider>
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.window().then((win) => {
      const event = {
        data: JSON.stringify({ type: "info", room: roomDataHost }),
      };

      win.onRoomMessage(event);

      const event2 = {
        data: JSON.stringify({ type: "leave", room: roomDataLeave }),
      };

      win.onRoomMessage(event2);
    });
    // room name and user name should be visible
    cy.contains("Test Room").should("be.visible");
    cy.contains("Tester").should("be.visible");
    cy.contains("Tester2").should("be.visible");
    cy.contains("Tester4").should("be.visible");

    //tester3 should not be visible
    cy.contains("Tester3").should("not.exist");

    // start button should be disabled
    cy.contains("Empezar partida").should("be.disabled");

    // salir button should be enabled
    cy.contains("Salir").should("be.enabled");

    // current players should be 3 and max 12
    cy.contains("3/12").should("be.visible");
  });

  it("4 players and one joins", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <WebsocketContextProvider websocket={cy.stub().as("websocket")}>
            <Room />
          </WebsocketContextProvider>
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.window().then((win) => {
      const event = {
        data: JSON.stringify({ type: "info", room: roomDataHost }),
      };

      win.onRoomMessage(event);

      const event2 = {
        data: JSON.stringify({ type: "join", room: roomDataJoin }),
      };

      win.onRoomMessage(event2);
    });
    // room name and user name should be visible
    cy.contains("Test Room").should("be.visible");
    cy.contains("Tester").should("be.visible");
    cy.contains("Tester2").should("be.visible");
    cy.contains("Tester3").should("be.visible");
    cy.contains("Tester4").should("be.visible");
    cy.contains("Tester5").should("be.visible");

    // start button should be disabled
    cy.contains("Empezar partida").should("be.enabled");

    // salir button should be enabled
    cy.contains("Salir").should("be.enabled");

    // current players should be 5 and max 12
    cy.contains("5/12").should("be.visible");
  });
  it("leave button", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <WebsocketContextProvider websocket={cy.stub().as("websocket")}>
            <Room />
          </WebsocketContextProvider>
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.window()
      // .should("have.property", "onRoomMessage")
      .then((win) => {
        const event = {
          data: JSON.stringify({ type: "info", room: roomDataHost }),
        };

        // cy.stub(win, "leaveRoom").as("leaveRoomStub");

        win.onRoomMessage(event);
      });
    // salir button should be enabled
    cy.contains("Salir").should("be.enabled");
  });
});
