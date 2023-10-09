Cypress.Commands.add("login", (username) => {
  cy.get("form").type(username);
  cy.contains("Jugar").click();
});

Cypress.Commands.add("create_room", (roomname) => {
  cy.contains("Crear Sala").click();
  cy.get("form").type(roomname);
  cy.get(".MuiDialogActions-root > .MuiButton-contained").click();
});

// join to the first room in the list
Cypress.Commands.add("join_room", () => {
  cy.get("div[id=0]").click();
  cy.contains("Unirse").should("be.enabled");
  cy.contains("Unirse").click();
  cy.location("pathname").should("include", "/room");
});
