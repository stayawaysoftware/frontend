describe("checks home page", () => {
  let i = 1;
  beforeEach("login the user", () => {
    cy.visit("/");
    cy.login(`Visitante${i}`);
    i++;
    cy.location("pathname").should("eq", "/");
  });

  it("render home page", () => {
    cy.contains("Lista de salas").should("be.visible");
    cy.contains("Unirse").should("be.visible");
    cy.contains("Crear Sala").should("be.visible");
  });

  it("join room disabled", () => {
    cy.contains("Unirse").should("be.visible");
    cy.contains("Unirse").should("be.disabled");
  });

  it("get data", () => {
    cy.intercept("GET", "/rooms*", (req) => {
      req.reply((res) => {
        expect(res.statusCode).to.eq(200);
      });
    });
  });

  it("create a room", () => {
    cy.create_room(`Sala de prueba`);
  });

  it("user can join to a room", () => {
    cy.join_room();
  });
});
