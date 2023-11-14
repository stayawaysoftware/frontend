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

const cardListFlamethrowerDefense = [
  { id: 17, idtype: 17 },
  { id: 3, idtype: 3 },
  { id: 4, idtype: 4 },
  { id: 5, idtype: 5 },
];

const handPropsBasic = {
  cardList: cardListWithLaCosa,
  defense: [],
  target_player: 3,
  isSomeoneBeingDefended: false,
  role: "Human",
  isPlayPhase: true,
  cardTargetRole: "Human",
  panicCard: null,
};

const empty_defense = [];
const flamethrower_defense = [{ id: 17, idtype: 17 }];

const target_player = 3;
const isSomeoneBeingDefended = false;

describe("<Hand />", () => {
  beforeEach("Mount component", () => {});
  it("renders with 4 cards", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <Hand {...handPropsBasic} />
        </UserContext.Provider>
      </BrowserRouter>
    );
    cy.get("#hand").should("exist");
    cy.get("#hand").children().should("have.length", 4);
  });
  it("Renders with LaCosa and clicks cards in play phase", () => {
    const userContextValueWithStub = {
      username: "Tester",
      roomid: 1,
      userid: 1,
      clickedCard: null,
      targetsEnable: null,
      onCardClicked: cy.stub().as("onCardClicked"),
    };
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValueWithStub}>
          <Hand
            cardList={cardListWithLaCosa}
            defense={empty_defense}
            target_player={3}
            isSomeoneBeingDefended={false}
            role={"Human"}
            isPlayPhase={true}
            cardTargetRole={"Human"}
            panicCard={null}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("#hand").should("exist");
    cy.get("#hand").children().should("have.length", 4);

    cy.get("img").eq(0).click({ force: true });

    cy.get("@onCardClicked").should("be.calledOnce");
    //clicked card should be null
    cy.get("@onCardClicked").should("be.calledWith", null);

    cy.get("img").eq(2).click({ force: true });

    cy.get("@onCardClicked").should("be.calledTwice");

    //clicked card should be {id: 2, idtype: 2}
    cy.get("@onCardClicked").should("be.calledWith", {
      id: 3,
      idtype: 3,
    });
  });

  it("Renders with 5 cards", () => {
    const userContextValueWithStub = {
      username: "Tester",
      roomid: 1,
      userid: 1,
      clickedCard: null,
      targetsEnable: null,
      onCardClicked: cy.stub().as("onCardClicked"),
    };
    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValueWithStub}>
          <Hand
            cardList={cardListLength5}
            defense={empty_defense}
            target_player={3}
            isSomeoneBeingDefended={false}
            role={"Human"}
            isPlayPhase={true}
            cardTargetRole={"Human"}
            panicCard={null}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("#hand").should("exist");
    cy.get("#hand").children().should("have.length", 5);

    cy.get("img").eq(0).click({ force: true });

    cy.get("@onCardClicked").should("be.calledOnce");
    //clicked card should be null
    cy.get("@onCardClicked").should("be.calledWith", null);

    cy.get("img").eq(2).click({ force: true });

    cy.get("@onCardClicked").should("be.calledTwice");
  });

  it("Renders defense cards", () => {
    const userContextValueWithStub = {
      username: "Tester",
      roomid: 1,
      userid: 1,
      clickedCard: null,
      targetsEnable: null,
      onCardClicked: cy.stub().as("onCardClicked"),
    };

    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValueWithStub}>
          <Hand
            cardList={cardListFlamethrowerDefense}
            defense={[17]}
            target_player={1}
            isSomeoneBeingDefended={true}
            role={"Human"}
            isPlayPhase={true}
            cardTargetRole={"Human"}
            panicCard={null}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("#hand").should("exist");

    cy.get("#hand").children().should("have.length", 4);

    //NoBarbecues should be in hand (src)
    cy.get("img").should("have.attr", "src").should("include", "NoBarbecues");

    //first card should be clickable
    cy.get("img").eq(0).click({ force: true });
    //clicked card should be {id: 17, idtype: 17}

    cy.get("@onCardClicked").should("be.calledWith", {
      id: 17,
      idtype: 17,
    });

    cy.get("@onCardClicked").should("be.calledOnce");

    //second card should not be clickable
    cy.get("img").eq(1).click({ force: true });

    cy.get("@onCardClicked").should("be.calledTwice");

    //clicked card should be null
    cy.get("@onCardClicked").should("be.calledWith", null);
  });

  it("LaCosa should not be exchangeable", () => {
    const userContextValueWithStub = {
      username: "Tester",
      roomid: 1,
      userid: 1,
      clickedCard: null,
      targetsEnable: null,
      onCardClicked: cy.stub().as("onCardClicked"),
      isExchangePhase: true,
    };

    cy.mount(
      <BrowserRouter>
        <UserContext.Provider value={userContextValueWithStub}>
          <Hand
            cardList={cardListWithLaCosa}
            defense={[]}
            target_player={1}
            isSomeoneBeingDefended={false}
            role={"Human"}
            isPlayPhase={false}
            cardTargetRole={"Human"}
            panicCard={null}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );

    cy.get("#hand").should("exist");

    cy.get("#hand").children().should("have.length", 4);

    //first card should not be clickable
    cy.get("img").eq(0).click({ force: true });

    cy.get("@onCardClicked").should("be.calledOnce");

    //clicked card should be null
    cy.get("@onCardClicked").should("be.calledWith", null);
  });
});
