describe("Login and user creation", () => {
  it("should create a new user", () => {
    // simulate a POST request to /user/new
    cy.intercept("POST", "/user/new", {
      statusCode: 201,
      body: {
        id: 1,
        username: "LoginTest1",
      },
    }).as("newUser");

    cy.visit("/");

    // login is a command that was defined in cypress/support/commands.js
    cy.login("LoginTest1");

    cy.wait("@newUser");
    //verify that newUser response is correct
    cy.get("@newUser").should((req) => {
      expect(req.response.statusCode).to.equal(201);
      expect(req.response.body).to.have.property("id", 1);
      expect(req.response.body).to.have.property("username", "LoginTest1");
    });

    //verify that the user can see Lista de Salas
    // cy.wait(2000);
    cy.contains("Lista de salas").should("be.visible");
  });

  it("should not create a new user if username is already taken", () => {
    cy.intercept("POST", "/user/new", {
      statusCode: 403,
      body: {
        detail: "Username already taken",
      },
    }).as("newUser");

    cy.visit("/");
    cy.login("LoginTest1");

    cy.wait("@newUser");

    cy.get("@newUser").should((req) => {
      expect(req.response.statusCode).to.equal(403);
      expect(req.response.body).to.have.property(
        "detail",
        "Username already taken"
      );
    });
    //an alert should appear
    cy.contains("Username already taken").should("be.visible");
  });

  //should add user delete test
});
