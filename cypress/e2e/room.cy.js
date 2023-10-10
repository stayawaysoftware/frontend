describe("checks room page", () => {
  beforeEach("login the user", () => {
    cy.visit("/");
  });
  it("checks that with one use, can't start game", () => {
    cy.login(`HostCantStartGame`);
    cy.create_room(`Sala1`);
    cy.get("button[id=start-game]").should("be.disabled");
  });
  it("checks that if i'am not host, can't start game", () => {
    cy.login(`CommonUserCantStartGame`);
    cy.join_room();
    cy.get("button[id=start-game]").should("be.disabled");
  });
  it("checks that if i'am host can start game with al least 4 players", () => {
    cy.visit("/room/1");
    cy.intercept("POST", "/users?username=*").as("postUser");
    cy.login("HostStartGame");

    cy.fixture("roomdata").then((data) => {
      cy.wait("@postUser")
        .its("response.body")
        .then((body) => {
          cy.intercept(
            {
              method: "GET",
              url: "/rooms/*",
            },
            {
              statusCode: 200,
              body: {
                ...data,
                host_id: body.id,
              },
            }
          ).as("getRoom");
        });
    });
    cy.wait("@getRoom");
    cy.get("button[id=start-game]").should("be.enabled");
  });
});
