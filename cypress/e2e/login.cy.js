describe("checks login", () => {
  beforeEach("login the user", () => {
    cy.visit("/");
  });

  it("login a user", () => {
    cy.login("Visitante");
    cy.location("pathname").should("eq", "/");
    cy.contains("Lista de salas").should("be.visible");
  });

  it("not login if username is in use", () => {
    cy.login("Ejemplo");
    cy.visit("/");
    cy.login("Ejemplo");
    cy.intercept("POST", "/users?username=*", (req) => {
      req.reply((res) => {
        expect(res.statusCode).to.eq(403);
      });
    });
  });

  it("delete a user", () => {
    let userid = 3;
    // no se settea bien el user id, asi que se hardcodea
    cy.login("Ejemplo1");
    cy.visit("/");
    cy.login("Ejemplo2");
    cy.visit("/");
    cy.login("Ejemplo3");
    cy.intercept("POST", "/users?username=*", (req) => {
      req.reply((res) => {
        expect(res.statusCode).to.eq(201);
        userid = res.body.id;
      });
    });

    cy.request("DELETE", `http://localhost:8000/users/${userid}`).as("user");
    cy.get("@user").should((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
