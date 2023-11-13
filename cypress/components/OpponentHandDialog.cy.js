import React from "react";
import OpponentHand from "../../src/components/OpponentHandDialog/OpponentHand";
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

const cardListOnlyLaCosa = [{ id: 1, idtype: 1 }];

const cardListLength4 = [
  { id: 1, idtype: 1 },
  { id: 2, idtype: 2 },
  { id: 3, idtype: 3 },
  { id: 4, idtype: 4 },
];

describe("<OpponentHandDialog />", () => {
  it("renders with only la cosa", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <OpponentHand cardList={cardListOnlyLaCosa} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    //there should be 1 card
    cy.get("img").should("have.length", 1);

    //the src attribute should contain the word "TheThing"
    cy.get("img").should("have.attr", "src").and("include", "TheThing");
  });

  it("renders with full hand", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <OpponentHand cardList={cardListLength4} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    //there should be 4 cards
    cy.get("img").should("have.length", 4);

    //there should be a div with id hand
    cy.get("#hand").should("exist");

    //there should be card-hand-0, card-hand-1, card-hand-2, card-hand-3
    //with img
    cy.get("#card-hand-0").should("exist");
    cy.get("#card-hand-0")
      .find("img")
      .should("exist")
      .and("have.attr", "src")
      .and("include", "TheThing");

    cy.get("#card-hand-1").should("exist");
    cy.get("#card-hand-1")
      .find("img")
      .should("exist")
      .and("have.attr", "src")
      .and("include", "Infected");

    cy.get("#card-hand-2").should("exist");
    cy.get("#card-hand-2")
      .find("img")
      .should("exist")
      .and("have.attr", "src")
      .and("include", "Flamethrower");

    cy.get("#card-hand-3").should("exist");
    cy.get("#card-hand-3")
      .find("img")
      .should("exist")
      .and("have.attr", "src")
      .and("include", "Analysis");
  });
});
