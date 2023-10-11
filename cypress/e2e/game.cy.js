describe("game functionality", () => {
  it("render view", () => {
    cy.visit("/game/1");
    cy.login("RenderView222");
    cy.fixture("gamedata").then(function (data) {
      cy.intercept(
        {
          method: "GET",
          url: "/game/*",
        },
        {
          statusCode: 200,
          body: data,
        }
      ).as("getGame");
    });
    cy.wait("@getGame");
    cy.location("pathname").should("eq", "/game/1");
    cy.contains("Jugar Carta").should("be.visible");
    cy.get("div[class*=circle]").should("be.visible");
    cy.get("div[id=hand]").should("be.visible");
  });
  it("if is user turn, can play", () => {
    cy.visit("/game/1");
    cy.intercept("POST", "/users?username=*").as("postUser");
    cy.login("CanPlay");
    cy.fixture("gamedata").then(function (data) {
      cy.wait("@postUser")
        .its("response.body")
        .then((body) => {
          cy.intercept(
            {
              method: "GET",
              url: "/game/*",
            },
            {
              statusCode: 200,
              body: {
                ...data,
                players: [
                  {
                    ...data.players[0],
                    id: body.id,
                    name: body.username,
                  },
                ],
              },
            }
          ).as("getGame");
        });
    });
    cy.wait("@getGame");
    cy.contains("CanPlay").should("be.visible");
    cy.get("div[id=card-hand-1]").click();
    cy.contains("Jugar Carta").should("be.enabled");
  });
  it("if is not user turn, can't play", () => {
    cy.visit("/game/1");
    cy.intercept("POST", "/users?username=*").as("postUser");
    cy.login("CantPlay");
    cy.fixture("gamedata").then(function (data) {
      cy.wait("@postUser")
        .its("response.body")
        .then((body) => {
          cy.intercept(
            {
              method: "GET",
              url: "/game/*",
            },
            {
              statusCode: 200,
              body: {
                ...data,
                players: [
                  {
                    ...data.players[0],
                    id: body.id,
                    name: body.username,
                  },
                ],
              },
            }
          ).as("getGame");
        });
    });
    cy.wait("@getGame");
    cy.contains("Jugar Carta").should("be.disabled");
  });
  it("render players death on table", () => {
    cy.visit("/game/2");
    cy.login("PlaterDeath");
    cy.intercept(
      {
        method: "GET",
        url: "/game/*",
      },
      {
        statusCode: 200,
        fixture: "gamedata",
      }
    ).as("getGame");
    cy.wait("@getGame");
    cy.get("div[id=death]").should("be.visible");
  });
});
