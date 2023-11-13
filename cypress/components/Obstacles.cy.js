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
  it("renders ", () => {
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
  });
  it("renders in quarentine", () => {
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
            quarentine={true}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("div").should("have.class", "square");
    // cy.get("div").should("have.class", "quarentine");
    //src should be quarentine
    cy.get("img").should("have.attr", "src").and("include", "cuarentena");
  });
  it("renders locked door to the left", () => {
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
            quarentine={false}
            door_locked={-1}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );
    cy.get("div").should("have.class", "square");

    //alt should include door
    cy.get("img").should("have.attr", "alt").and("include", "left_door");
    //src should include door  there should be a img
    cy.get("img").should("have.attr", "src").and("include", "png");
  });
  it("renders locked door to the right", () => {
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
            quarentine={false}
            door_locked={1}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );
    cy.get("div").should("have.class", "square");

    //alt should include door
    cy.get("img").should("have.attr", "alt").and("include", "right_door");
    //src should include door  there should be a img
    cy.get("img").should("have.attr", "src").and("include", "png");
  });

  it("renders locked double door", () => {
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
            quarentine={false}
            door_locked={2}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );
    cy.get("div").should("have.class", "square");

    //alt should include door
    cy.get("img").should("have.attr", "alt").and("include", "double_door");
    //src should include door  there should be a img
    cy.get("img").should("have.attr", "src").and("include", "png");
  });

  it("renders locked door to the right and quarantine", () => {
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
            quarentine={true}
            door_locked={1}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );
    cy.get("div").should("have.class", "square");

    //div class row should include img with alt quarentine

    cy.get("div")
      .should("have.class", "row")
      .find("img")
      .should("have.attr", "alt")
      .and("include", "quarentine");

    //inside div class row there should be div class column2
    //and inside div class column2 there should be img with alt right_door
    cy.get("div")
      .should("have.class", "row")
      .find("div")
      .should("have.class", "column2")
      .find("img")
      .should("have.attr", "alt");

    cy.get('[alt="right_door"]').should("exist");
  });
});
