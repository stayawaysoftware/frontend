describe("checks room page", () => {
  beforeEach("login the user", () => {
    cy.visit("/");
  });
  it("checks that with one use, can't start game", () => {
    cy.login(`Visitante1`);
    cy.create_room(`Sala1`);
    cy.get("button[id=start-game]").should("be.disabled");
  });
  it("checks that if i'am not host, can't start game", () => {
    cy.login(`Visitante2`);
    cy.join_room();
    cy.get("button[id=start-game]").should("be.disabled");
  });
});
