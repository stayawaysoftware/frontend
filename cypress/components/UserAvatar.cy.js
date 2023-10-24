import React from "react";
import { UserAvatar } from "../../src/components/UserAvatar/UserAvatar";
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

describe("<UserAvatar />", () => {
  it("renders alive player", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <UserAvatar
            name={"Tester"}
            css={{
              rotate: 0,
              radius: 0,
              rotateReverse: 0,
            }}
            death={false}
            turn={false}
            onClick={cy.stub().as("onClick")}
            turnDefense={false}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );

    //there should be an avatar
    cy.get("div").should("have.class", "square");

    //default avatar should be shown
    //for some reason default avatar is "broken-image.jpg"
    // cy.get("img").should("have.attr", "src").and("include", "broken-image");

    //there should be a name
    cy.get("div").should("contain.text", "Tester");
  });
  it("renders player with crown", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <UserAvatar
            name={"Tester"}
            css={{
              rotate: 0,
              radius: 0,
              rotateReverse: 0,
            }}
            death={false}
            turn={true}
            onClick={cy.stub().as("onClick")}
            turnDefense={false}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("div").should("have.class", "square");
    // cy.get("img").should("have.attr", "src").and("include", "broken-image");
    cy.get("div").should("contain.text", "Tester");
    cy.get("img").should("have.attr", "src").and("include", "crown");
  });

  it("renders dead player", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <UserAvatar
            name={"DeadTester"}
            css={{
              rotate: 0,
              radius: 0,
              rotateReverse: 0,
            }}
            death={true}
            turn={false}
            onClick={cy.stub().as("onClick")}
            turnDefense={false}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("div").should("have.class", "square");
    // cy.get("img").should("have.attr", "src").and("include", "broken-image");
    cy.get("div").should("contain.text", "DeadTester");
    //check for avatar with id death
    cy.get("#death").should("exist");
  });

  it("renders player with sword", () => {
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <UserAvatar
            name={"DefendingTester"}
            css={{
              rotate: 0,
              radius: 0,
              rotateReverse: 0,
            }}
            death={false}
            turn={false}
            onClick={cy.stub().as("onClick")}
            turnDefense={true}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("div").should("have.class", "square");
    // cy.get("img").should("have.attr", "src").and("include", "broken-image");
    cy.get("div").should("contain.text", "DefendingTester");
    //check for img with src sword
    cy.get("img").should("have.attr", "src").and("include", "sword");
  });
});
