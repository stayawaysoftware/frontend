import React from "react";
import Hand from "../../src/components/GameComps/Hand";
import { UserContext, UserProvider } from "../../src/contexts/UserContext";
import { WebsocketContextProvider } from "../../src/contexts/WebsocketContext";
import { BrowserRouter } from "react-router-dom";

const userContextValue = {
  username: "Tester",
  roomid: 1,
  userid: 1,
  clickedCard: null,
  targetsEnable: null,
};

const cardListWithLaCosa = [
  { id: 1, idtype: 1 }, //la cosa
  { id: 2, idtype: 2 },
  { id: 3, idtype: 3 },
  { id: 4, idtype: 4 },
];

const cardListLength5 = [
  { id: 1, idtype: 1 },
  { id: 2, idtype: 2 },
  { id: 3, idtype: 3 },
  { id: 4, idtype: 4 },
  { id: 5, idtype: 5 },
];

describe("<Hand />", () => {
  beforeEach("Mount component", () => {});
  it("Renders with LaCosa asset", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <Hand cardList={cardListWithLaCosa} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    //there should be 4 cards
    cy.get("img").should("have.length", 4);

    //the src attribute should contain the word "TheThing"
    cy.get("img").should("have.attr", "src").and("include", "TheThing");
  });

  it("Renders with 5 cards", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <Hand cardList={cardListLength5} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    //there should be 5 cards
    cy.get("img").should("have.length", 5);
  });

  it("Test onCardClicked", () => {
    const userContextValue = {
      username: "Tester",
      // setUserName: jest.fn(),
      roomid: 1,
      // setRoomId: jest.fn(),
      userid: 1,
      // setUserId: jest.fn(),
      clickedCard: null,
      // onCardClicked: jest.fn(),
      onCardClicked: cy.stub().as("onCardClicked"),
      targetsEnable: null,
    };

    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <Hand cardList={cardListWithLaCosa} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    //there should be 4 cards
    cy.get("img").should("have.length", 4);

    //verify the thing
    cy.get("img").should("have.attr", "src").and("include", "TheThing");

    //click on the thing
    cy.get("img").eq(0).click({ force: true });
    //check that clicked card is the thing

    cy.get("@onCardClicked").should("be.calledWith", {
      id: 1,
      idtype: 1,
    });
  });
});
