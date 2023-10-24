import React from "react";
import GameArrows from "../../src/components/GameComps/Arrows";
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

describe("<GameArrows />", () => {
  it("Renders clockwise", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <GameArrows turnOrder={true} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("img").should("have.length", 2);

    cy.get("img").should("have.class", "horario1");
    cy.get("img").should("have.class", "horario2");

    cy.get("img").should("have.attr", "src").and("include", "flechita_izq");
  });

  it("Renders counterclockwise", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <GameArrows turnOrder={false} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("img").should("have.length", 2);

    cy.get("img").should("have.class", "antihorario1");
    cy.get("img").should("have.class", "antihorario2");

    cy.get("img").should("have.attr", "src").and("include", "flechita_der");
  });
});
