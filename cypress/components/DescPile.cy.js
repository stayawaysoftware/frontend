import React from "react";
import DescPile from "../../src/components/GameComps/DescPile";
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

describe("<DescPile />", () => {
  it("renders with LaCosa as lastCard", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <DescPile lastCard={1} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("img").should("have.attr", "src").and("include", "TheThing");
  });

  it("render with flamethrower as lastCard", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <DescPile lastCard={3} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("img").should("have.attr", "src").and("include", "Flamethrower");
  });

  it("render suspicion as lastCard", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <DescPile lastCard={6} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("img").should("have.attr", "src").and("include", "Suspicion");
  });
});
