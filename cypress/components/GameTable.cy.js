import React from "react";
import GameTable from "../../src/components/GameTable/GameTable";
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

//write function to generate playersTable to the nth player
const generatePlayersTable = (n) => {
  let playersTable = [];
  for (let i = 0; i < n; i++) {
    playersTable.push({
      id: i + 1,
      name: `Tester${i + 1}`,
      death: false,
      position: i + 1,
    });
  }
  return playersTable;
};

const playerTableDeath = [
  { id: 1, name: "Tester1", death: false, position: 1 },
  { id: 2, name: "Tester2", death: true, position: 2 },
  { id: 3, name: "Tester3", death: false, position: 3 },
  { id: 4, name: "Tester4", death: false, position: 4 },
];

describe("<GameTable />", () => {
  beforeEach("Mount component", () => {
    cy.viewport(1000, 760);
  });
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <GameTable
            playersTable={generatePlayersTable(4)}
            currentTurn={1}
            left_id={11}
            right_id={2}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("div").should("be.visible");

    cy.get("div").contains("Tester4").should("be.visible");
    cy.get("div").contains("Tester3").should("be.visible");
    cy.get("div").contains("Tester2").should("be.visible");
  });
  it("Renders when im not the current player with 12 players", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <GameTable
            playersTable={generatePlayersTable(12)}
            currentTurn={3}
            left_id={11}
            right_id={2}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("div").should("be.visible");

    //testers 2 to 12 should be visible
    cy.get("div").contains("Tester2").should("be.visible");
    cy.get("div").contains("Tester3").should("be.visible");
    cy.get("div").contains("Tester4").should("be.visible");
    cy.get("div").contains("Tester5").should("be.visible");
    cy.get("div").contains("Tester6").should("be.visible");
    cy.get("div").contains("Tester7").should("be.visible");
    cy.get("div").contains("Tester8").should("be.visible");
    cy.get("div").contains("Tester9").should("be.visible");
    cy.get("div").contains("Tester10").should("be.visible");
    cy.get("div").contains("Tester11").should("be.visible");
    cy.get("div").contains("Tester12").should("be.visible");
  });

  it("Renders death users", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <GameTable
            playersTable={playerTableDeath}
            currentTurn={3}
            left_id={11}
            right_id={2}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("div").should("be.visible");
    cy.get("div").contains("Tester4").should("be.visible");
    cy.get("div").contains("Tester3").should("be.visible");
    cy.get("div").contains("Tester2").should("be.visible");

    //tester2 should have a death avatar
    cy.get("div[id=death]").should("be.visible");

    //tester3 should have crown
    cy.get("img").should("have.attr", "alt").and("include", "crown");
  });

  it("Renders crown", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <GameTable
            playersTable={playerTableDeath}
            currentTurn={3}
            left_id={11}
            right_id={2}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("div").should("be.visible");
    cy.get("div").contains("Tester4").should("be.visible");
    cy.get("div").contains("Tester3").should("be.visible");
    cy.get("div").contains("Tester2").should("be.visible");

    //should have crown
    cy.get("img").should("have.attr", "alt").and("include", "crown");
  });
});
