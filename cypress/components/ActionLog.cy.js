import React from "react";
import { ActionLog } from "../../src/components/ActionLog/ActionLog";
import { UserContext, UserProvider } from "../../src/contexts/UserContext";
import { WebsocketContextProvider } from "../../src/contexts/WebsocketContext";
import { BrowserRouter } from "react-router-dom";

const listOfActions = [
  { name1: "Jugador1", action: 3, name2: "Jugador2" },
  { name1: "gere", action: 3, name2: "Jugador2" },
  { name1: "Benja", action: 8, name2: null },
  { name1: "Player", action: "exchange", name2: "Jugador2" },
  { name1: "Jugador1", action: "new_turn", name2: "Jugador2" },
  { name1: "Jugador1", action: "discard", name2: null },
  { name1: "Ignacho", action: 20, name2: "agustina morales" },
  { name1: "messi", action: 14, name2: null },
  { name1: "omg", action: 5, name2: "nt" },
];
const userContextValue = {
  username: "Tester",
  roomid: 1,
  userid: 1,
  clickedCard: null,
  targetsEnable: null,
};
describe("<ActionLog />", () => {
  it("renders empty", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <ActionLog listOfActions={[]} />
        </UserContext.Provider>
      </BrowserRouter>
    );
  });
  it("renders open and close", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <ActionLog listOfActions={[]} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("#actionLogButton").click();
    //the drawer should be open
    cy.get("#actionLogDrawer").should("exist");
    //close the drawer
    cy.get("#closeActionLog").click();

    //the drawer should be closed, taht menas
    // the div inside it should have style, visibility: hidden
    cy.get(".MuiDrawer-paper").should("have.css", "visibility", "hidden");
  });
});
