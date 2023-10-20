import "cypress-real-events/support";

Cypress.Commands.add("login", (username) => {
  cy.get("form").type(username);
  cy.contains("Jugar").click();
});

Cypress.Commands.add("complete_login", (username) => {
  cy.intercept("POST", "/user/new", {
    statusCode: 201,
    body: {
      id: 1,
      username: username,
    },
  }).as("newUser");

  cy.visit("/");
  cy.login(username);
  cy.wait("@newUser");
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

Cypress.Commands.add("login_and_create_room", (roomname) => {
  cy.intercept("GET", "/room/list", {
    statusCode: 200,
    body: [],
  }).as("getRooms");

  cy.intercept("POST", "/room/new", {
    statusCode: 201,
    body: {
      id: 1,
    },
  }).as("createRoom");

  cy.complete_login("Visitante");
  cy.wait("@getRooms");

  cy.contains("Crear Sala").click();

  //fill the Nombre de la sala field, its the first input
  cy.get("form").find("input").first().type("Sala de prueba");
  //click the create button
  cy.get(".MuiDialogActions-root > .MuiButton-contained").click();

  cy.wait("@createRoom");
  //verify that the response is correct
  cy.get("@createRoom").should((req) => {
    expect(req.response.statusCode).to.equal(201);
    expect(req.response.body).to.have.property("id", 1);
  });
});
