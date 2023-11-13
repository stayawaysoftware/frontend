import React from "react";
import Deck from "../../src/components/GameComps/Deck";
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

describe("<Deck />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <Deck />
        </UserContext.Provider>
      </BrowserRouter>
    );

    //there should be a img with alt mazo and src mazo
    cy.get("img").should("have.attr", "alt").and("include", "mazo");
    cy.get("img").should("have.attr", "src").and("include", "mazo");
  });
});
