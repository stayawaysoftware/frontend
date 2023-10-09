Cypress.Commands.add("login", (username) => {
  cy.get("form").type(username);
  cy.contains("Jugar").click();
});
