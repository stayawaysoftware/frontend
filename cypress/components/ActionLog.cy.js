import React from "react";
import { ActionLog } from "../../src/components/ActionLog/ActionLog";
import { UserContext, UserProvider } from "../../src/contexts/UserContext";
import { WebsocketContextProvider } from "../../src/contexts/WebsocketContext";
import { BrowserRouter } from "react-router-dom";

const listOfActions1 = [{ name1: "Jugador1", action: 3, name2: "Jugador2" }];

const listOfActionsSelf = [{ name1: "Benja", action: 8, name2: null }];

const listOfActionsNewTurn = [
  { name1: "Jugador1", action: "new_turn", name2: null },
  { name1: "Jugador1", action: 3, name2: "Jugador2" },
];

const listOfActionsExchange = [
  { name1: "Jugador1", action: "new_turn", name2: null },
  { name1: "Jugador1", action: 4, name2: "Jugador2" },
  { name1: "Cambio1", action: "exchange", name2: "Cambio2" },
];

const listOfActionsDiscard = [
  { name1: "Jugador1", action: "new_turn", name2: null },
  { name1: "Jugador1", action: "discard", name2: null },
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

    //the drawer should be closed
    cy.get(".MuiDrawer-paper").should("have.css", "visibility", "hidden");

    cy.get("#actionLogButton").click();
    //the drawer should be open
    cy.get("#actionLogDrawer").should("exist");
    //close the drawer
    cy.get("#closeActionLog").click();

    cy.get(".MuiDrawer-paper").should("have.css", "visibility", "hidden");
  });

  it("renders with 1 action", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <ActionLog listOfActions={listOfActions1} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("#actionLogButton").click();

    //there should be 1 action
    cy.get("#actionLogDrawer").should("exist");
    cy.get("#actionLogBox").should("exist").children().should("have.length", 1);

    //names Jugador1 and Jugador2 should be visible
    cy.get("#actionLogBox").should("contain", "Jugador1");
    cy.get("#actionLogBox").should("contain", "Jugador2");

    //there should be an img with src Flamethrower
    cy.get("#actionLogBox")
      .find("img")
      .should("have.attr", "src")
      .and("include", "Flamethrower");
  });

  it("renders with 1 self action", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <ActionLog listOfActions={listOfActionsSelf} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("#actionLogButton").click();

    //there should be 1 action
    cy.get("#actionLogDrawer").should("exist");
    cy.get("#actionLogBox").should("exist").children().should("have.length", 1);

    //names Benja should be visible
    cy.get("#actionLogBox").should("contain", "Benja");

    //there should be an img with src Whisky
    cy.get("#actionLogBox")
      .find("img")
      .should("have.attr", "src")
      .and("include", "Whisky");
  });

  it("renders new turn", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <ActionLog listOfActions={listOfActionsNewTurn} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("#actionLogButton").click();

    //there should be 2 actions
    cy.get("#actionLogDrawer").should("exist");
    cy.get("#actionLogBox").should("exist").children().should("have.length", 2);

    // "Turno de Jugador1" should be visible
    cy.get("#actionLogBox").should("contain", "Turno de Jugador1");
  });

  it("renders with exchange", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <ActionLog listOfActions={listOfActionsExchange} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("#actionLogButton").click();

    //there should be 3 actions
    cy.get("#actionLogDrawer").should("exist");
    cy.get("#actionLogBox").should("exist").children().should("have.length", 3);

    //names "Cambio1" and "Cambio2" should be visible
    cy.get("#actionLogBox").should("contain", "Cambio1");
    cy.get("#actionLogBox").should("contain", "Cambio2");

    //look for data-testid="CompareArrowsIcon", exchange icon
    cy.get("#actionLogBox")
      .find("[data-testid='CompareArrowsIcon']")
      .should("exist");
  });

  it("renders with discard", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <ActionLog listOfActions={listOfActionsDiscard} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("#actionLogButton").click();

    //there should be 3 actions
    cy.get("#actionLogDrawer").should("exist");
    cy.get("#actionLogBox").should("exist").children().should("have.length", 2);

    //names "Cambio1" and "Cambio2" should be visible
    cy.get("#actionLogBox").should("contain", "Jugador1");

    //look for data-testid="DeleteIcon", Delete Icon
    cy.get("#actionLogBox").find("[data-testid='DeleteIcon']").should("exist");
  });
});
